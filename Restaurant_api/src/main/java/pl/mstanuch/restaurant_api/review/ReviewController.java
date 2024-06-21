package pl.mstanuch.restaurant_api.review;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

	private final ReviewService reviewService;

	@PostMapping("/add")
	public ResponseEntity<?> addNewReview(@RequestBody AddReviewRequest request) {
		try {
			reviewService.validate(request);
			reviewService.addReview(request);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (IllegalStateException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error occurred while adding review");
		}
	}

	@GetMapping("/")
	public List<Review> getAllReviews() {
		return reviewService.getAllReviews();
	}

}
