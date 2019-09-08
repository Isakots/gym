package hu.martos.gym.web.rest;

import hu.martos.gym.GymApp;
import hu.martos.gym.domain.Tool;
import hu.martos.gym.repository.ToolRepository;
import hu.martos.gym.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static hu.martos.gym.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ToolResource} REST controller.
 */
@SpringBootTest(classes = GymApp.class)
public class ToolResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;
    private static final Integer SMALLER_QUANTITY = 0;

    @Autowired
    private ToolRepository toolRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restToolMockMvc;

    private Tool tool;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ToolResource toolResource = new ToolResource(toolRepository);
        this.restToolMockMvc = MockMvcBuilders.standaloneSetup(toolResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tool createEntity(EntityManager em) {
        Tool tool = new Tool()
            .name(DEFAULT_NAME)
            .quantity(DEFAULT_QUANTITY);
        return tool;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tool createUpdatedEntity(EntityManager em) {
        Tool tool = new Tool()
            .name(UPDATED_NAME)
            .quantity(UPDATED_QUANTITY);
        return tool;
    }

    @BeforeEach
    public void initTest() {
        tool = createEntity(em);
    }

    @Test
    @Transactional
    public void createTool() throws Exception {
        int databaseSizeBeforeCreate = toolRepository.findAll().size();

        // Create the Tool
        restToolMockMvc.perform(post("/api/tools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tool)))
            .andExpect(status().isCreated());

        // Validate the Tool in the database
        List<Tool> toolList = toolRepository.findAll();
        assertThat(toolList).hasSize(databaseSizeBeforeCreate + 1);
        Tool testTool = toolList.get(toolList.size() - 1);
        assertThat(testTool.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTool.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createToolWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = toolRepository.findAll().size();

        // Create the Tool with an existing ID
        tool.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restToolMockMvc.perform(post("/api/tools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tool)))
            .andExpect(status().isBadRequest());

        // Validate the Tool in the database
        List<Tool> toolList = toolRepository.findAll();
        assertThat(toolList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = toolRepository.findAll().size();
        // set the field null
        tool.setName(null);

        // Create the Tool, which fails.

        restToolMockMvc.perform(post("/api/tools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tool)))
            .andExpect(status().isBadRequest());

        List<Tool> toolList = toolRepository.findAll();
        assertThat(toolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuantityIsRequired() throws Exception {
        int databaseSizeBeforeTest = toolRepository.findAll().size();
        // set the field null
        tool.setQuantity(null);

        // Create the Tool, which fails.

        restToolMockMvc.perform(post("/api/tools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tool)))
            .andExpect(status().isBadRequest());

        List<Tool> toolList = toolRepository.findAll();
        assertThat(toolList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTools() throws Exception {
        // Initialize the database
        toolRepository.saveAndFlush(tool);

        // Get all the toolList
        restToolMockMvc.perform(get("/api/tools?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tool.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    public void getTool() throws Exception {
        // Initialize the database
        toolRepository.saveAndFlush(tool);

        // Get the tool
        restToolMockMvc.perform(get("/api/tools/{id}", tool.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tool.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingTool() throws Exception {
        // Get the tool
        restToolMockMvc.perform(get("/api/tools/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTool() throws Exception {
        // Initialize the database
        toolRepository.saveAndFlush(tool);

        int databaseSizeBeforeUpdate = toolRepository.findAll().size();

        // Update the tool
        Tool updatedTool = toolRepository.findById(tool.getId()).get();
        // Disconnect from session so that the updates on updatedTool are not directly saved in db
        em.detach(updatedTool);
        updatedTool
            .name(UPDATED_NAME)
            .quantity(UPDATED_QUANTITY);

        restToolMockMvc.perform(put("/api/tools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTool)))
            .andExpect(status().isOk());

        // Validate the Tool in the database
        List<Tool> toolList = toolRepository.findAll();
        assertThat(toolList).hasSize(databaseSizeBeforeUpdate);
        Tool testTool = toolList.get(toolList.size() - 1);
        assertThat(testTool.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTool.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingTool() throws Exception {
        int databaseSizeBeforeUpdate = toolRepository.findAll().size();

        // Create the Tool

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restToolMockMvc.perform(put("/api/tools")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tool)))
            .andExpect(status().isBadRequest());

        // Validate the Tool in the database
        List<Tool> toolList = toolRepository.findAll();
        assertThat(toolList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTool() throws Exception {
        // Initialize the database
        toolRepository.saveAndFlush(tool);

        int databaseSizeBeforeDelete = toolRepository.findAll().size();

        // Delete the tool
        restToolMockMvc.perform(delete("/api/tools/{id}", tool.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tool> toolList = toolRepository.findAll();
        assertThat(toolList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tool.class);
        Tool tool1 = new Tool();
        tool1.setId(1L);
        Tool tool2 = new Tool();
        tool2.setId(tool1.getId());
        assertThat(tool1).isEqualTo(tool2);
        tool2.setId(2L);
        assertThat(tool1).isNotEqualTo(tool2);
        tool1.setId(null);
        assertThat(tool1).isNotEqualTo(tool2);
    }
}
