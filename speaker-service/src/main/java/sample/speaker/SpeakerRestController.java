package sample.speaker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/speakers")
public class SpeakerRestController {
	
	@Autowired
	SpeakerRepository repo;
	
	@PostMapping("/by/ids")
	public List<Speaker> getSpeakers(@RequestBody List<Long> speakerIds) {
		return repo.findAll(speakerIds);
	}

}