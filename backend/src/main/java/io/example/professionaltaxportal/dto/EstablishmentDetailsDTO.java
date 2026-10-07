package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstablishmentDetailsDTO {

    private String applicationId;
    
    private List<EstablishmentInfo> establishments;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EstablishmentInfo {
        private String name;
        private String address;
    }
}