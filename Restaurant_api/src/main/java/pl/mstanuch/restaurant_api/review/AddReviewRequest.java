package pl.mstanuch.restaurant_api.review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddReviewRequest {

	private String name;
	private String surname;
	private String message;
	private String phoneNumber;
	private long rating;
}
