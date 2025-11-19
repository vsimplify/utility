package gov.ca.dcss.guidelinecalculator.model;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class GuidelineResponse implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long processInstanceId;
    private Boolean isEligible;
    private Double calculatedAmount;
    private String guidelineCategory;
    private List<String> validationMessages;
    private Date calculatedDate;
    
    public GuidelineResponse() {
        this.validationMessages = new ArrayList<>();
        this.calculatedDate = new Date();
        this.isEligible = false;
    }
    
    // Getters
    public Long getProcessInstanceId() { return processInstanceId; }
    public Boolean getIsEligible() { return isEligible; }
    public Double getCalculatedAmount() { return calculatedAmount; }
    public String getGuidelineCategory() { return guidelineCategory; }
    public List<String> getValidationMessages() { return validationMessages; }
    public Date getCalculatedDate() { return calculatedDate; }
    
    // Setters
    public void setProcessInstanceId(Long processInstanceId) { this.processInstanceId = processInstanceId; }
    public void setIsEligible(Boolean isEligible) { this.isEligible = isEligible; }
    public void setCalculatedAmount(Double calculatedAmount) { this.calculatedAmount = calculatedAmount; }
    public void setGuidelineCategory(String guidelineCategory) { this.guidelineCategory = guidelineCategory; }
    public void setValidationMessages(List<String> validationMessages) { this.validationMessages = validationMessages; }
    public void addValidationMessage(String message) { this.validationMessages.add(message); }
    public void setCalculatedDate(Date calculatedDate) { this.calculatedDate = calculatedDate; }
    
    @Override
    public String toString() {
        return "GuidelineResponse{" +
                "processInstanceId=" + processInstanceId +
                ", isEligible=" + isEligible +
                ", calculatedAmount=" + calculatedAmount +
                ", guidelineCategory='" + guidelineCategory + '\'' +
                ", validationMessages=" + validationMessages +
                ", calculatedDate=" + calculatedDate + '}';
    }
}