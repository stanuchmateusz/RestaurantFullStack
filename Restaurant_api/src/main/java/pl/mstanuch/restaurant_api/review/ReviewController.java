package pl.mstanuch.restaurant_api.review;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/review")
@RequiredArgsConstructor
public class ReviewController {

	private ReviewService reviewService;

	@PostMapping("/add")
	public ResponseEntity addNewReview(AddReviewRequest request) {
		try {
			reviewService.validate(request);
			reviewService.addReview(request);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error while adding review");
		}
	}

	@GetMapping("/")
	public List<Review> getAllReviews() {
		return reviewService.getAllReviews();
	}

	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.ok("test");
	}
}
