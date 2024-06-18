package pl.mstanuch.restaurant_api.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.mstanuch.restaurant_api.config.JwtService;
import pl.mstanuch.restaurant_api.user.Role;
import pl.mstanuch.restaurant_api.user.User;
import pl.mstanuch.restaurant_api.user.UserRepository;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;


	/**
	 * Register a new user in the system.
	 *
	 * @param request The registration request containing user details
	 * @return An authentication response with an access token
	 */
	public AuthenticationResponse register(RegisterRequest request) {
		validateRegisterRequest(request);

		User user = User.builder()
				.firstname(request.getFirstname())
				.lastname(request.getLastname())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(Role.USER)
				.build();

		repository.save(user);
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.build();
	}

	protected void validateRegisterRequest(RegisterRequest request) {
		if (request.getFirstname() == null || request.getFirstname().isEmpty()) {
			throw new AuthException("Firstname cannot be empty");
		}
		if (request.getLastname() == null || request.getLastname().isEmpty()) {
			throw new AuthException("Lastname cannot be empty");
		}
		if (request.getEmail() == null || request.getEmail().isEmpty()) {
			throw new AuthException("Email cannot be empty");
		}
		if (request.getPassword() == null || request.getPassword().isEmpty()) {
			throw new AuthException("Password cannot be empty");
		}

		if (isEmailTaken(request.getEmail())) {
			throw new AuthException("Email already taken");
		}
	}

	protected boolean isEmailTaken(String email) {
		return repository.findByEmail(email).isPresent();
	}

	/**
	 * Authenticate the user based on the provided request.
	 *
	 * @param request The authentication request containing user credentials
	 * @return An authentication response with an access token
	 */
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		var res = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
				)
		);

		if (res == null) {
			throw new AuthException("Invalid email or password");
		}
		var jwtToken = jwtService.generateToken((UserDetails) res.getPrincipal());
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.build();

	}
}
