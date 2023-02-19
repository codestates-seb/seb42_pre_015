package preproject.underdog.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class Uri {
    public static URI createUri(String defaultUri, String endPoint){
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUri+endPoint)
                .build()
                .toUri();
    }
}
