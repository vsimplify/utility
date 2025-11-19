package gov.ca.dcss.guidelinecalculator.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class GuidelineRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long processInstanceId;
    private Integer numberOfChildren;
    private List<ChildInfo> children;
    private Date requestDate;
    
    public GuidelineRequest() {
        this.children = new ArrayList<>();
        this.requestDate = new Date();
    }
    
    public GuidelineRequest(Integer numberOfChildren) {
        this();
        this.numberOfChildren = numberOfChildren;
        for (int i = 0; i < numberOfChildren; i++) {
            this.children.add(new ChildInfo());
        }
    }
    
    // Getters
    public Long getProcessInstanceId() { return processInstanceId; }
    public Integer getNumberOfChildren() { return numberOfChildren; }
    public List<ChildInfo> getChildren() { return children; }
    public Date getRequestDate() { return requestDate; }
    
    // Setters
    public void setProcessInstanceId(Long processInstanceId) { this.processInstanceId = processInstanceId; }
    public void setNumberOfChildren(Integer numberOfChildren) { this.numberOfChildren = numberOfChildren; }
    public void setChildren(List<ChildInfo> children) { this.children = children; }
    public void setRequestDate(Date requestDate) { this.requestDate = requestDate; }
    
    @Override
    public String toString() {
        return "GuidelineRequest{" +
                "processInstanceId=" + processInstanceId +
                ", numberOfChildren=" + numberOfChildren +
                ", children=" + children +
                ", requestDate=" + requestDate + '}';
    }
}