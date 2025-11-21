package gov.ca.dcss.guidelinecalculator.model;

import java.io.Serializable;

public class ChildrenCountRequest implements Serializable {
    private int childrenCount;

    public int getChildrenCount() {
        return childrenCount;
    }

    public void setChildrenCount(int childrenCount) {
        this.childrenCount = childrenCount;
    }
}
