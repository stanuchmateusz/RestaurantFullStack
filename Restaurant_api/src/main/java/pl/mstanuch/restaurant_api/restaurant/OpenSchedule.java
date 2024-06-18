package pl.mstanuch.restaurant_api.restaurant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
//@Entity
public class OpenSchedule {

	@OneToOne()
	private Restaurant restaurant;
	@Id
	@GeneratedValue
	private Long id;

}
