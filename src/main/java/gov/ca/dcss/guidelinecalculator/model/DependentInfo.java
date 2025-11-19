package gov.ca.dcss.guidelinecalculator.model;

import java.io.Serializable;

import java.util.List;

import jakarta.enterprise.context.Dependent;


public class DependentInfo implements Serializable {

    private List<Dependent> dependents;
    private Double parentA_GrossIncome;
    private Double parentB_GrossIncome;
    private Double custodyPercentageHigh;

    public void setDependents(List<Dependent> dependents) {
        this.dependents = dependents;
    }

    public void setParentA_GrossIncome(Double parentA_GrossIncome) {
        this.parentA_GrossIncome = parentA_GrossIncome;
    }

    public void setParentB_GrossIncome(Double parentB_GrossIncome) {
        this.parentB_GrossIncome = parentB_GrossIncome;
    }

    public void setCustodyPercentageHigh(Double custodyPercentageHigh) {
        this.custodyPercentageHigh = custodyPercentageHigh;
    }

    public List<Dependent> getDependents() {
        return dependents;
    }

    public Double getParentA_GrossIncome() {
        return parentA_GrossIncome;
    }

    public Double getParentB_GrossIncome() {
        return parentB_GrossIncome;
    }

    public Double getCustodyPercentageHigh() {
        return custodyPercentageHigh;
    }

    public DependentInfo() {
    }

}