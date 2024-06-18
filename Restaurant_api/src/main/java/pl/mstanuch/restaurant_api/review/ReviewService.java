package pl.mstanuch.restaurant_api.review;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class ReviewService {

	private final ReviewRepository repository;

	public ReviewService(ReviewRepository repository) {
		this.repository = repository;
	}

	public void addReview(AddReviewRequest request) {
		repository.save(Review.builder()
				.name(request.getName())
				.surname(request.getSurname())
				.message(request.getMessage())
				.phoneNumber(request.getPhoneNumber())
				.rating(request.getRating())
				.build());
	}

	public List<Review> getAllReviews() {
		return StreamSupport.stream(repository.findAll().spliterator(), false).toList();
	}

	public void validate(AddReviewRequest request) {
		if (request.getRating() < 1 || request.getRating() > 5) {
			throw new IllegalStateException("Rating must be between 1 and 5");
		}

		if (request.getPhoneNumber() == null || request.getPhoneNumber().isEmpty()) {
			throw new IllegalStateException("Phone number cannot be empty");
		}
		var phoneNumber = request.getPhoneNumber();
		if (phoneNumber.length() != 9) {
			throw new IllegalStateException("Phone number must be 9 digits long");
		}
		if (repository.findByPhoneNumber(phoneNumber).isPresent()) {
			throw new IllegalStateException("Phone number already exists");
		}

		if (request.getMessage().length() < 10) {
			throw new IllegalStateException("Message must be at least 10 characters long");
		}

		if (request.getMessage().length() > 500) {
			throw new IllegalStateException("Message must be at most 500 characters long");
		}

		if (request.getName().length() < 2) {
			throw new IllegalStateException("Name must be at least 2 characters long");
		}

		if (request.getSurname().length() < 2) {
			throw new IllegalStateException("Surname must be at least 2 characters long");
		}


	}
}
