package pl.mstanuch.restaurant_api.review;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Long> {

	Optional<Review> findByPhoneNumber(String phoneNumber);

	void deleteByPhoneNumber(String phoneNumber);
}
