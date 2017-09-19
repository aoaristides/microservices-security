package sample.session;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sessions")
public class SessionRestController {
	
	@Autowired
	SessionRepository repo;
	
	@Autowired
	SpeakerClient speakerClient;
	
	@GetMapping("/{code}")
	public SessionDTO getByCode(@PathVariable String code) {
		Session session = repo.findOne(code);
		List<SpeakerDTO> speakers = speakerClient.getSpeakers(session.getSpeakerIds());
		return SessionDTO.builder()
				.code(session.getCode())
				.title(session.getTitle())
				.level(session.getLevel())
				.speakers(speakers)
				.build();
	}
	
}
