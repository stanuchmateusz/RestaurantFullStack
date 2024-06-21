package pl.mstanuch.restaurant_api.review;

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
	private String phoneNumber;
	private String name;
	private String surname;
	private String message;
	private String date;
	float rating;
}
