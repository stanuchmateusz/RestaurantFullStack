package pl.mstanuch.restaurant_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pl.mstanuch.restaurant_api.review.AddReviewRequest;
import pl.mstanuch.restaurant_api.review.Review;
import pl.mstanuch.restaurant_api.review.ReviewController;
import pl.mstanuch.restaurant_api.review.ReviewService;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = ReviewController.class)
public class ReviewControllerTest {

	@Mock
	private ReviewService reviewService;

	@InjectMocks
	private ReviewController reviewController;


	private MockMvc mockMvc;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
		this.mockMvc = MockMvcBuilders.standaloneSetup(reviewController).build();
	}

	@Test
	public void testAddNewReviewSuccess() throws Exception {
		AddReviewRequest request = new AddReviewRequest();
		request.setName("John");
		request.setSurname("Doe");
		request.setMessage("This is a test review");
		request.setRating(5);
		request.setPhoneNumber("123456789");

		mockMvc.perform(post("/api/v1/review/add")
						.contentType(MediaType.APPLICATION_JSON)
						.content(String.valueOf(request)))
				.andExpect(status().isCreated());
	}

	@Test
	public void testAddNewReviewFailure() throws Exception {
		AddReviewRequest request = new AddReviewRequest();

		doThrow(new RuntimeException()).when(reviewService).validate(any(AddReviewRequest.class));

		mockMvc.perform(post("/api/v1/review/add")
						.contentType(MediaType.APPLICATION_JSON)
						.content(request.toString()))
				.andExpect(status().isBadRequest())
				.andExpect(content().string("Error occurred while adding review"));
	}

	@Test
	public void testGetAllReviews() throws Exception {
		List<Review> reviews = Arrays.asList(new Review(), new Review());

		when(reviewService.getAllReviews()).thenReturn(reviews);

		mockMvc.perform(get("/api/v1/review/"))
				.andExpect(status().isOk())
				.andExpect(content().json("[{}, {}]"));
	}
}