package pl.mstanuch.restaurant_api.review;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Review {
	@Id
	private Long id;

	private String name;

	private String surname;

	private String message;

	private String date;

	private String phoneNumber;

	long rating;


}
