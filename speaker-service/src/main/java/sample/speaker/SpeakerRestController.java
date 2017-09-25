package sample.speaker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/speakers")
public class SpeakerRestController {
	
	@Autowired
	SpeakerRepository repo;

	@GetMapping
    public List<Speaker> getAll() {
        return repo.findAll();
    }

	@GetMapping("/{id}")
	public ResponseEntity<Speaker> get(@PathVariable Long id) {
		Speaker speaker = repo.findOne(id);
		if (speaker != null) {
			return ResponseEntity.ok(speaker);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping
	public ResponseEntity<Speaker> create(@RequestBody Speaker speaker) {
        speaker = repo.save(speaker);
		if (speaker != null) {
			return ResponseEntity.ok(speaker);
		} else {
			return ResponseEntity.unprocessableEntity().build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Speaker> update(@PathVariable Long id, @RequestBody Speaker speaker) {
		if (speaker != null) {
            speaker.setId(id);
            speaker = repo.save(speaker);
			return ResponseEntity.ok(speaker);
		} else {
			return ResponseEntity.unprocessableEntity().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Speaker> delete(@PathVariable Long id) {
		Speaker speaker = repo.findOne(id);
		if (speaker != null) {
			repo.delete(speaker);
			return ResponseEntity.ok(speaker);
		} else {
			return ResponseEntity.unprocessableEntity().build();
		}
	}

	@PostMapping("/by/ids")
	public List<Speaker> getSpeakers(@RequestBody List<Long> speakerIds) {
		return repo.findAll(speakerIds);
	}

}