package pl.mstanuch.restaurant_api.auth;

public class AuthException extends RuntimeException {

	public AuthException(String message) {
		super(message);
	}
}
