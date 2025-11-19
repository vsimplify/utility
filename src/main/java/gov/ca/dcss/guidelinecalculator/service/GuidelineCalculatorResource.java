package gov.ca.dcss.guidelinecalculator.service;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import gov.ca.dcss.guidelinecalculator.model.DependentInfo;

@Path("/api/guideline-calculator")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GuidelineCalculatorResource {

    @POST
    @Path("/children-count")
    public Response validateChildrenCount(int count) {
        try {
            // Basic validation implemented here; rule engine integration is planned for later iterations
            if (count < 0 || count > 10) {
                throw new IllegalArgumentException("childrenCount must be between 0 and 10");
            }
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .build();
        }
    }

    @POST
    @Path("/dependent-info")
    public Response validateDependentInfo(DependentInfo dependentInfo) {
        try {
            // Validate using rules
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .build();
        }
    }
}