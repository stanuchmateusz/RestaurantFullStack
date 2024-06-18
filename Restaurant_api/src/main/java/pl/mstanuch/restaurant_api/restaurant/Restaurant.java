package pl.mstanuch.restaurant_api.restaurant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Restaurant {
	@Id
	@GeneratedValue
	private Long id;

	private String name;

	private String address;

	private String phoneNumber;

	@OneToOne()
	private OpenSchedule openSchedule;


}
