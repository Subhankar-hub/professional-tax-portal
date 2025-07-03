// package io.example.professionaltaxportal.config;

// import org.modelmapper.ModelMapper;
// import org.modelmapper.convention.MatchingStrategies;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// @Configuration
// public class ModelMapperConfig {

//     @Bean
//     public ModelMapper modelMapper() {
//         ModelMapper mapper = new ModelMapper();
//         mapper.getConfiguration()
//                 .setMatchingStrategy(MatchingStrategies.STRICT)
//                 .setFieldMatchingEnabled(true)
//                 .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
//         return mapper;
//     }
// }


package io.example.professionaltaxportal.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
