package io.example.professionaltaxportal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstablishmentTypeDTO {

    private String applicationId;
    private Integer ptaxCategory;
    private Integer ptaxSubcategory;
    private Boolean engagedWithProfession;
    private Boolean engagedWithTrade;
    private Boolean engagedWithCalling;
    private Boolean engagedWithEmployment;
}
