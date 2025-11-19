package gov.ca.dcss.guidelinecalculator.model;

import java.io.Serializable;

public class Dependent implements Serializable {
    private static final long serialVersionUID = 1L;

    private String dependentName;
    private String dateOfBirth;
    private String relationship;
    private Double overnightPercentage;
    private Double monthlyHealthPremium;

    public Dependent() {
    }

    public Dependent(String dependentName, String dateOfBirth, String relationship) {
        this.dependentName = dependentName;
        this.dateOfBirth = dateOfBirth;
        this.relationship = relationship;
    }

    // Getters
    public String getDependentName() { return dependentName; }
    public String getDateOfBirth() { return dateOfBirth; }
    public String getRelationship() { return relationship; }
    public Double getOvernightPercentage() { return overnightPercentage; }
    public Double getMonthlyHealthPremium() { return monthlyHealthPremium; }

    // Setters
    public void setDependentName(String dependentName) { this.dependentName = dependentName; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public void setRelationship(String relationship) { this.relationship = relationship; }
    public void setOvernightPercentage(Double overnightPercentage) { this.overnightPercentage = overnightPercentage; }
    public void setMonthlyHealthPremium(Double monthlyHealthPremium) { this.monthlyHealthPremium = monthlyHealthPremium; }

    @Override
    public String toString() {
        return "Dependent{" +
                "dependentName='" + dependentName + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", relationship='" + relationship + '\'' +
                ", overnightPercentage=" + overnightPercentage +
                ", monthlyHealthPremium=" + monthlyHealthPremium +
                '}';
    }
}