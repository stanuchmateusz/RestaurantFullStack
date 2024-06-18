package pl.mstanuch.restaurant_api.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService service;

	/**
	 * Register a new user in the system.
	 *
	 * @param request the registration request containing user details
	 * @return an authentication response with an access token or error message
	 */
	@PostMapping("/register")
	public ResponseEntity<?> register(
			@RequestBody RegisterRequest request
	) {
		try {
			return ResponseEntity.ok(service.register(request));
		} catch (AuthException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
		}
	}

	/**
	 * Authenticate the user based on the provided request.
	 *
	 * @param request the authentication request containing user credentials
	 * @return an authentication response with an access token or error message
	 */
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(
			@RequestBody AuthenticationRequest request
	) {
		try {
			return ResponseEntity.ok(service.authenticate(request));
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		} catch (AuthException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
		}
	}

	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.ok("test");
	}
}
