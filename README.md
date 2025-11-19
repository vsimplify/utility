# DCSS Guideline Calculator Forms Utility

A streamlined BAMOE 9.3.x compatible forms application for California Child Support Guideline calculations.

## 🚀 Quick Start (Windows)

### Prerequisites
- **Java 17** (OpenJDK or Oracle JDK)
- **Node.js 18+** and **npm**
- **Git**

### 1. Clone Repository


### 2. Install Dependencies
```bash
npm install
```

### 3. Build Forms
```bash
npm run build
```

### 4. Start Application
```bash
mvnw.cmd quarkus:dev
```

### 5. Access Forms
- **Children Count Form**: http://localhost:8080/forms/dcss-children-form.html
- **Dependent Info Form**: http://localhost:8080/forms/dcss-dependent-form.html
- **BAMOE Dev UI**: http://localhost:8080/q/dev-ui/extensions

## 📋 What This Includes

### ✅ Core Components
- **TypeScript React Forms** with PatternFly 5.x UI components
- **BAMOE 9.3.x Process Engine** with BPMN workflow
- **Child Support Calculation Service** (CA Family Code §4055)
- **MySQL Database Integration** (to be configured)
- **Kafka Integration** (to be configured, for event streaming)

### ✅ Build System
- **webpack** for TypeScript compilation
- **Maven** for Java/Quarkus build
- **PatternFly 5.x** enterprise UI components

### ✅ Forms Features
- **Children Count Input** (1-20 children)
- **Parent Income Entry** (gross income with automatic net calculation)
- **Custody Percentage** (time share between parents)
- **Dependent Details** (names, DOB, special needs)
- **Real-time Validation** and calculation preview

## 🔧 Configuration

### Database (Optional)
Update `src/main/resources/application.properties`:
```properties
quarkus.datasource.db-kind=mysql
quarkus.datasource.jdbc.url=jdbc:mysql://localhost:3306/dcss_db
quarkus.datasource.username=your_username
quarkus.datasource.password=your_password
```

### Kafka (Optional)
For event streaming:
```properties
kafka.bootstrap.servers=localhost:9092
```

## 🏗️ Project Structure

```mermaid
graph TB
    A[DCSS Guideline Calculator] --> B[Frontend Layer]
    A --> C[Backend Layer]
    A --> D[Process Layer]
    A --> E[Data Layer]

    B --> B1[TypeScript React Forms]
    B --> B2[PatternFly 5.x Components]
    B --> B3[HTML Forms]

    C --> C1[Quarkus REST API]
    C --> C2[Java Services]
    C --> C3[Validation Logic]

    D --> D1[BAMOE Process Engine]
    D --> D2[BPMN Workflows]
    D --> D3[User Tasks]

    E --> E1[Java Data Models]
    E --> E2[MySQL Database]
    E --> E3[Kafka Events]

    subgraph "Build System"
        F[Maven] --> F1[pom.xml]
        G[webpack] --> G1[package.json]
        H[TypeScript] --> H1[tsconfig.json]
    end

    B1 --> G
    C1 --> F
    D1 --> F
```

## 🎯 Usage Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant F as React Forms
    participant B as BAMOE Process
    participant S as Calculation Service
    participant D as Database

    U->>F: Access Children Count Form
    F->>B: Submit children count (1-20)
    B->>B: Validate input range
    B->>F: Display Dependent Info Form

    U->>F: Enter parent incomes & custody %
    U->>F: Enter dependent details
    F->>B: Submit dependent information
    B->>B: Process form data

    B->>S: Execute calculation service
    S->>S: Apply CA Family Code §4055
    S->>S: Calculate K-factor & amounts
    S->>B: Return calculated results

    B->>D: Store calculation results
    B->>F: Display final child support amount
    F->>U: Show calculation breakdown

    Note over U,D: Optional: Persist to MySQL & publish to Kafka
```

## 🔍 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
mvnw.cmd clean
npm run build
mvnw.cmd quarkus:dev
```

### Port Conflicts
```properties
# Change port in application.properties
quarkus.http.port=8081
```

### Database Connection
```bash
# Ensure MySQL is running
# Update connection details in application.properties
```

## 📚 Technical Details

### 🏛️ System Architecture

```mermaid
classDiagram
    class GuidelineCalculatorResource {
        +validateChildrenCount(int): Response
        +validateDependentInfo(DependentInfo): Response
    }

    class DependentInfo {
        -List~Dependent~ dependents
        -Double parentA_GrossIncome
        -Double parentB_GrossIncome
        -Double custodyPercentageHigh
        +setDependents(List)
        +getDependents(): List
        +setParentA_GrossIncome(Double)
        +getParentA_GrossIncome(): Double
        +setParentB_GrossIncome(Double)
        +getParentB_GrossIncome(): Double
        +setCustodyPercentageHigh(Double)
        +getCustodyPercentageHigh(): Double
    }

    class Dependent {
        -String dependentName
        -String dateOfBirth
        -String relationship
        -Double overnightPercentage
        -Double monthlyHealthPremium
        +Dependent()
        +Dependent(String, String, String)
        +getDependentName(): String
        +setDependentName(String)
        +getDateOfBirth(): String
        +setDateOfBirth(String)
        +getRelationship(): String
        +setRelationship(String)
        +getOvernightPercentage(): Double
        +setOvernightPercentage(Double)
        +getMonthlyHealthPremium(): Double
        +setMonthlyHealthPremium(Double)
    }

    class GuidelineResponse {
        -Long processInstanceId
        -Boolean isEligible
        -Double calculatedAmount
        -String guidelineCategory
        -List~String~ validationMessages
        -Date calculatedDate
        +GuidelineResponse()
        +getProcessInstanceId(): Long
        +setProcessInstanceId(Long)
        +getIsEligible(): Boolean
        +setIsEligible(Boolean)
        +getCalculatedAmount(): Double
        +setCalculatedAmount(Double)
        +getGuidelineCategory(): String
        +setGuidelineCategory(String)
        +getValidationMessages(): List
        +addValidationMessage(String)
        +getCalculatedDate(): Date
        +setCalculatedDate(Date)
    }

    GuidelineCalculatorResource ..> DependentInfo : uses
    DependentInfo --> Dependent : contains
    GuidelineCalculatorResource ..> GuidelineResponse : returns

    note for GuidelineCalculatorResource "REST API endpoints for\nchild support calculations"
    note for DependentInfo "Container for parent income\nand custody information"
    note for Dependent "Individual child information\nwith care percentages"
    note for GuidelineResponse "Calculation results with\nvalidation messages"
```

### 🔄 BPMN Process Flow

```mermaid
flowchart TD
    A([Start Process]) --> B[Enter # of Children]
    B --> C{Valid Count?<br/>1-20 children}
    C -->|Yes| D[Enter Dependent Info]
    C -->|No| E([Error: Invalid Count])

    D --> F[Input Parent Incomes]
    F --> G[Input Custody %]
    G --> H[Input Child Details]
    H --> I[Calculate Child Support]

    I --> J[Apply CA Family Code §4055]
    J --> K[Compute K-Factor]
    K --> L[Calculate Monthly Amount]
    L --> M([Process Complete])

    E --> N([End with Error])
    M --> O([End with Results])

    style A fill:#e1f5fe
    style M fill:#c8e6c9
    style E fill:#ffcdd2
    style N fill:#ffcdd2
```

### 🚀 Deployment Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        A --> B[React Forms UI]
    end

    subgraph "Application Server"
        C[Quarkus Runtime]
        C --> D[BAMOE Process Engine]
        C --> E[REST API Endpoints]
        C --> F[Form Rendering]
    end

    subgraph "Data Layer"
        G[(MySQL Database)]
        H{{Kafka Message Bus}}
    end

    B --> E
    D --> G
    D --> H
    E --> D

    style A fill:#e3f2fd
    style C fill:#f3e5f5
    style G fill:#e8f5e8
    style H fill:#fff3e0
```

### 🛠️ Technology Stack

- **Framework**: Quarkus 3.20.x with BAMOE 9.3.x
- **UI**: React 18 + TypeScript + PatternFly 5.x
- **Process Engine**: jBPM/Drools for BPMN execution
- **Database**: MySQL 8.x (optional)
- **Build**: Maven + webpack
- **Java**: OpenJDK 17

## 🤝 Support

For issues or questions:
- Check application logs: `tail -f target/quarkus.log`
- BAMOE Dev UI: http://localhost:8080/q/dev-ui/extensions
- Process instances: Check database or logs

---

**Ready for Windows deployment!** 🎉