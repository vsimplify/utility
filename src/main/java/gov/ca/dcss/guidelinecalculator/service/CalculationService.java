package gov.ca.dcss.guidelinecalculator.service;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class CalculationService {

    public Map<String, Object> calculate(Integer childrenCount, Double parentA_Income, Double parentB_Income, Double custodyPercent) {
        Map<String, Object> results = new HashMap<>();
        
        // Dummy calculation logic for iteration 1
        double totalIncome = (parentA_Income != null ? parentA_Income : 0.0) + (parentB_Income != null ? parentB_Income : 0.0);
        double kFactor = (childrenCount != null ? childrenCount : 1) * 0.1; // Simplified K factor
        double csAmount = totalIncome * kFactor;
        
        results.put("childSupportAmount", csAmount);
        results.put("kFactor", kFactor);
        results.put("netDisposableIncomeHigh", Math.max(parentA_Income != null ? parentA_Income : 0.0, parentB_Income != null ? parentB_Income : 0.0));
        results.put("netDisposableIncomeTotal", totalIncome);
        
        return results;
    }
}
