package sample.session;

import java.io.Serializable;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Session implements Serializable {

	@Id
	String code;
	String title;
	String level;	
	@ElementCollection
	List<Long> speakerIds;
	
}