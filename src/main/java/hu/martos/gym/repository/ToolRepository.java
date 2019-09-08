package hu.martos.gym.repository;

import hu.martos.gym.domain.Tool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tool entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ToolRepository extends JpaRepository<Tool, Long> {

}
