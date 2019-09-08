package hu.martos.gym.web.rest;

import hu.martos.gym.domain.Tool;
import hu.martos.gym.repository.ToolRepository;
import hu.martos.gym.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link hu.martos.gym.domain.Tool}.
 */
@RestController
@RequestMapping("/api")
public class ToolResource {

    private final Logger log = LoggerFactory.getLogger(ToolResource.class);

    private static final String ENTITY_NAME = "tool";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ToolRepository toolRepository;

    public ToolResource(ToolRepository toolRepository) {
        this.toolRepository = toolRepository;
    }

    /**
     * {@code POST  /tools} : Create a new tool.
     *
     * @param tool the tool to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tool, or with status {@code 400 (Bad Request)} if the tool has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tools")
    @PreAuthorize("hasAuthority('ROLE_MEMBER')")
    public ResponseEntity<Tool> createTool(@Valid @RequestBody Tool tool) throws URISyntaxException {
        log.debug("REST request to save Tool : {}", tool);
        if (tool.getId() != null) {
            throw new BadRequestAlertException("A new tool cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tool result = toolRepository.save(tool);
        return ResponseEntity.created(new URI("/api/tools/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tools} : Updates an existing tool.
     *
     * @param tool the tool to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tool,
     * or with status {@code 400 (Bad Request)} if the tool is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tool couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tools")
    @PreAuthorize("hasAuthority('ROLE_MEMBER')")
    public ResponseEntity<Tool> updateTool(@Valid @RequestBody Tool tool) throws URISyntaxException {
        log.debug("REST request to update Tool : {}", tool);
        if (tool.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tool result = toolRepository.save(tool);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tool.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tools} : get all the tools.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tools in body.
     */
    @GetMapping("/tools")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public List<Tool> getAllTools() {
        log.debug("REST request to get all Tools");
        return toolRepository.findAll();
    }

    /**
     * {@code GET  /tools/:id} : get the "id" tool.
     *
     * @param id the id of the tool to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tool, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tools/{id}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Tool> getTool(@PathVariable Long id) {
        log.debug("REST request to get Tool : {}", id);
        Optional<Tool> tool = toolRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tool);
    }

    /**
     * {@code DELETE  /tools/:id} : delete the "id" tool.
     *
     * @param id the id of the tool to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tools/{id}")
    @PreAuthorize("hasAuthority('ROLE_MEMBER')")
    public ResponseEntity<Void> deleteTool(@PathVariable Long id) {
        log.debug("REST request to delete Tool : {}", id);
        toolRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
