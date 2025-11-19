package gov.ca.dcss.guidelinecalculator.model;

import java.io.Serializable;
import java.util.UUID;

public class ChildInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String childId;
    private String childName;
    private Integer childAge;
    private String relationship;
    private Boolean isDependent;
    
    public ChildInfo() {
        this.childId = UUID.randomUUID().toString();
        this.isDependent = false;
    }
    
    public ChildInfo(String childName, Integer childAge) {
        this();
        this.childName = childName;
        this.childAge = childAge;
    }
    
    // Getters
    public String getChildId() { return childId; }
    public String getChildName() { return childName; }
    public Integer getChildAge() { return childAge; }
    public String getRelationship() { return relationship; }
    public Boolean getIsDependent() { return isDependent; }
    
    // Setters
    public void setChildId(String childId) { this.childId = childId; }
    public void setChildName(String childName) { this.childName = childName; }
    public void setChildAge(Integer childAge) { this.childAge = childAge; }
    public void setRelationship(String relationship) { this.relationship = relationship; }
    public void setIsDependent(Boolean isDependent) { this.isDependent = isDependent; }
    
    @Override
    public String toString() {
        return "ChildInfo{" +
                "childId='" + childId + '\'' +
                ", childName='" + childName + '\'' +
                ", childAge=" + childAge +
                ", relationship='" + relationship + '\'' +
                ", isDependent=" + isDependent + '}';
    }
}
