// DOM Elements
const totalRoomsInput = document.getElementById('totalRooms');
const totalBedsInput = document.getElementById('totalBeds');
const pricePerBedInput = document.getElementById('pricePerBed');
const occupancySelect = document.getElementById('occupancy');
const bedOpexInput = document.getElementById('bedOpex');
const annualSalariesInput = document.getElementById('annualSalaries');

const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');

// View selector
const viewSelect = document.getElementById('viewSelect');
const monthlyResults = document.getElementById('monthlyResults');
const yearlyResults = document.getElementById('yearlyResults');

// Results Display Elements
const occupiedBedsEl = document.getElementById('occupiedBeds');
const monthlyRevenueEl = document.getElementById('monthlyRevenue');
const contributionEl = document.getElementById('contribution');
const totalOpexEl = document.getElementById('totalOpex');
const marketingSpendEl = document.getElementById('marketingSpend');
const ebitdaEl = document.getElementById('ebitda');
const ownerEarningsEl = document.getElementById('ownerEarnings');
const operatorEarningsEl = document.getElementById('operatorEarnings');

// Yearly Results Display Elements
const yearlyRevenueEl = document.getElementById('yearlyRevenue');
const yearlyContributionEl = document.getElementById('yearlyContribution');
const yearlyOpexEl = document.getElementById('yearlyOpex');
const yearlyMarketingEl = document.getElementById('yearlyMarketing');
const yearlyEbitdaEl = document.getElementById('yearlyEbitda');
const yearlyOwnerEarningsEl = document.getElementById('yearlyOwnerEarnings');
const yearlyOperatorEarningsEl = document.getElementById('yearlyOperatorEarnings');

const statusBadge = document.getElementById('statusBadge');
const statusText = document.getElementById('statusText');

const ownerSplitVisual = document.getElementById('ownerSplitVisual');
const operatorSplitVisual = document.getElementById('operatorSplitVisual');
const ownerShareValue = document.getElementById('ownerShareValue');
const operatorShareValue = document.getElementById('operatorShareValue');

// Format currency in Indian Rupees
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    });
}

// Validate inputs to ensure no negative values
function validateInputs() {
    const inputs = [
        totalRoomsInput,
        totalBedsInput,
        pricePerBedInput,
        bedOpexInput,
        annualSalariesInput
    ];
    
    let isValid = true;
    
    inputs.forEach(input => {
        if (parseFloat(input.value) < 0) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#d1d5db';
        }
    });
    
    return isValid;
}

// Calculate financials based on inputs
function calculateFinancials() {
    // Validate inputs
    if (!validateInputs()) {
        alert('Please ensure all values are positive numbers.');
        return;
    }
    
    // Get input values
    const totalRooms = parseFloat(totalRoomsInput.value) || 0;
    const totalBeds = parseFloat(totalBedsInput.value) || 0;
    const pricePerBed = parseFloat(pricePerBedInput.value) || 0;
    const occupancy = parseFloat(occupancySelect.value) || 0;
    const bedOpex = parseFloat(bedOpexInput.value) || 0;
    const monthlySalaries = parseFloat(annualSalariesInput.value) || 0;
    const marketingRate = 0.05;
    const operatorRevenueCut = 0.05;
    const operatorProfitShare = 0.15;
    const ownerProfitShare = 0.85;
    
    console.log('Inputs:', {totalRooms, totalBeds, pricePerBed, occupancy, bedOpex, monthlySalaries, marketingRate, operatorRevenueCut, operatorProfitShare, ownerProfitShare});
    
    // Basic calculations
    const occupiedBeds = totalBeds * occupancy;
    const occupiedRooms = occupiedBeds / 2; // 2 beds per room
    
    console.log('Basic calculations:', {totalBeds, occupiedBeds, occupiedRooms});
    
    // Display basic metrics
    occupiedBedsEl.textContent = occupiedBeds.toFixed(0);
    
    // Revenue calculations
    const revenue = occupiedBeds * pricePerBed;
    const operatorRevenueCutAmount = revenue * 0.05;
    const contribution = revenue - operatorRevenueCutAmount;
    const marketing = revenue * 0.05;
    
    console.log('Revenue calculations:', {revenue, operatorRevenueCutAmount, contribution, marketing});
    
    // Expense calculations
    const roomOpex = bedOpex * 2; // 2 beds per room
    const totalOpex = occupiedRooms * roomOpex;
    
    console.log('Expense calculations:', {roomOpex, totalOpex, monthlySalaries, marketing});
    
    // EBITDA calculation
    const ebitda = contribution - totalOpex - monthlySalaries - marketing;
    
    console.log('EBITDA:', ebitda);
    
    // Profit split calculations
    let operatorProfit, ownerProfit;
    
    if (ebitda > 0) {
        const operatorProfitShareAmount = ebitda * operatorProfitShare;
        const ownerProfitShareAmount = ebitda * ownerProfitShare;
        operatorProfit = operatorProfitShareAmount + operatorRevenueCutAmount;
        ownerProfit = ownerProfitShareAmount;
    } else {
        operatorProfit = operatorRevenueCutAmount; // upfront cut even in losses
        ownerProfit = ebitda; // This will be negative in loss-making scenarios
    }
    
    console.log('Profit split:', {operatorProfit, ownerProfit, operatorRevenueCutAmount});
    
    // Update results display
    monthlyRevenueEl.textContent = formatCurrency(revenue);
    contributionEl.textContent = formatCurrency(contribution);
    totalOpexEl.textContent = formatCurrency(totalOpex);
    marketingSpendEl.textContent = formatCurrency(marketing);
    ebitdaEl.textContent = formatCurrency(ebitda);
    ownerEarningsEl.textContent = formatCurrency(ownerProfit);
    operatorEarningsEl.textContent = formatCurrency(operatorProfit);
    
    // Yearly calculations
    const yearlyRevenue = revenue * 12;
    const yearlyContribution = contribution * 12;
    const yearlyOpex = totalOpex * 12;
    const yearlyMarketing = marketing * 12;
    const yearlyEbitda = ebitda * 12;
    const yearlyOwnerProfit = ownerProfit * 12;
    const yearlyOperatorProfit = operatorProfit * 12;
    
    // Display yearly results
    yearlyRevenueEl.textContent = formatCurrency(yearlyRevenue);
    yearlyContributionEl.textContent = formatCurrency(yearlyContribution);
    yearlyOpexEl.textContent = formatCurrency(yearlyOpex);
    yearlyMarketingEl.textContent = formatCurrency(yearlyMarketing);
    yearlyEbitdaEl.textContent = formatCurrency(yearlyEbitda);
    yearlyOwnerEarningsEl.textContent = formatCurrency(yearlyOwnerProfit);
    yearlyOperatorEarningsEl.textContent = formatCurrency(yearlyOperatorProfit);
    
    // Update profit split visualization
    const ownerSharePercent = ownerProfitShare * 100;
    const operatorSharePercent = operatorProfitShare * 100;
    
    ownerSplitVisual.style.width = `${ownerSharePercent}%`;
    operatorSplitVisual.style.width = `${operatorSharePercent}%`;
    
    ownerSplitVisual.innerHTML = `<span>Owner: ${ownerSharePercent}%</span>`;
    operatorSplitVisual.innerHTML = `<span>Operator: ${operatorSharePercent}%</span>`;
    
    ownerShareValue.textContent = formatCurrency(ownerProfit);
    operatorShareValue.textContent = formatCurrency(operatorProfit);
    
    // Update status badge
    if (ebitda > 0) {
        statusBadge.className = 'status-badge profitable';
        statusText.textContent = 'Profitable';
    } else {
        statusBadge.className = 'status-badge loss-making';
        statusText.textContent = 'Loss-making';
    }
    
    // Generate new features
    generateExecutiveSummary();
    generateScenarioComparison();
    generateRiskSignals();
}

// Reset form to default values
function resetForm() {
    totalRoomsInput.value = '';
    totalBedsInput.value = '';
    pricePerBedInput.value = '';
    occupancySelect.value = '';
    bedOpexInput.value = '';
    annualSalariesInput.value = '';
    
    // Reset results display
    occupiedBedsEl.textContent = '0';
    monthlyRevenueEl.textContent = '₹0';
    contributionEl.textContent = '₹0';
    totalOpexEl.textContent = '₹0';
    marketingSpendEl.textContent = '₹0';
    ebitdaEl.textContent = '₹0';
    ownerEarningsEl.textContent = '₹0';
    operatorEarningsEl.textContent = '₹0';
    
    // Reset yearly results
    yearlyRevenueEl.textContent = '₹0';
    yearlyContributionEl.textContent = '₹0';
    yearlyOpexEl.textContent = '₹0';
    yearlyMarketingEl.textContent = '₹0';
    yearlyEbitdaEl.textContent = '₹0';
    yearlyOwnerEarningsEl.textContent = '₹0';
    yearlyOperatorEarningsEl.textContent = '₹0';
    
    ownerShareValue.textContent = '₹0';
    operatorShareValue.textContent = '₹0';
    
    statusBadge.className = 'status-badge';
    statusText.textContent = 'Enter values to calculate';
    
    // Reset profit split visualization
    ownerSplitVisual.style.width = '85%';
    operatorSplitVisual.style.width = '15%';
    
    // Reset input borders
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = '#d1d5db';
    });
    
    // Hide new sections
    document.getElementById('executiveSummary').style.display = 'none';
    document.getElementById('scenarioComparison').style.display = 'none';
    document.getElementById('riskSignals').style.display = 'none';
}

// Run scenario with different occupancy
function runScenario(occupancyValue) {
    const originalOccupancy = occupancySelect.value;
    
    // Temporarily set occupancy
    occupancySelect.value = occupancyValue;
    
    // Get input values for this scenario
    const totalRooms = parseFloat(totalRoomsInput.value) || 0;
    const totalBeds = parseFloat(totalBedsInput.value) || 0;
    const pricePerBed = parseFloat(pricePerBedInput.value) || 0;
    const occupancy = parseFloat(occupancyValue) || 0;
    const bedOpex = parseFloat(bedOpexInput.value) || 0;
    const monthlySalaries = parseFloat(annualSalariesInput.value) || 0;
    const marketingRate = 0.05;
    const operatorRevenueCut = 0.05;
    const operatorProfitShare = 0.15;
    const ownerProfitShare = 0.85;
    
    // Calculate scenario results (reuse logic from calculateFinancials)
    const occupiedBeds = totalBeds * occupancy;
    const occupiedRooms = occupiedBeds / 2;
    const revenue = occupiedBeds * pricePerBed;
    const operatorRevenueCutAmount = revenue * operatorRevenueCut;
    const contribution = revenue - operatorRevenueCutAmount;
    const marketing = revenue * marketingRate;
    const roomOpex = bedOpex * 2;
    const totalOpex = occupiedRooms * roomOpex;
    const ebitda = contribution - totalOpex - monthlySalaries - marketing;
    
    // Yearly calculations
    const yearlyRevenue = revenue * 12;
    const yearlyEbitda = ebitda * 12;
    
    // Restore original occupancy
    occupancySelect.value = originalOccupancy;
    
    return {
        occupancy: occupancyValue,
        monthlyRevenue: formatCurrency(revenue),
        monthlyEbitda: formatCurrency(ebitda),
        yearlyRevenue: formatCurrency(yearlyRevenue),
        yearlyEbitda: formatCurrency(yearlyEbitda),
        monthlyStatus: getStatusFromEBITDA(formatCurrency(ebitda)),
        yearlyStatus: getStatusFromEBITDA(formatCurrency(yearlyEbitda)),
        isPositive: ebitda >= 0
    };
}

// Get status based on EBITDA value
function getStatusFromEBITDA(ebitdaText) {
    const ebitdaValue = parseFloat(ebitdaText.replace('₹', '').replace(/,/g, ''));
    if (ebitdaValue < 0) return 'Loss';
    if (ebitdaValue >= 0 && ebitdaValue < 50000) return 'Break-even';
    if (ebitdaValue >= 50000 && ebitdaValue < 100000) return 'Stable';
    if (ebitdaValue >= 100000 && ebitdaValue < 200000) return 'Strong';
    return 'Excellent';
}

// Generate executive summary
function generateExecutiveSummary() {
    const isYearlyView = viewSelect.value === 'yearly';
    const occupancyPercent = (parseFloat(occupancySelect.value) * 100).toFixed(0) + '%';
    const beds = parseFloat(totalBedsInput.value) || 0;
    const ebitdaText = isYearlyView ? yearlyEbitdaEl.textContent : ebitdaEl.textContent;
    const status = getStatusFromEBITDA(ebitdaText);
    
    let statusDescription = '';
    if (status === 'Loss') {
        statusDescription = 'loss-making';
    } else if (status === 'Break-even') {
        statusDescription = 'break-even';
    } else {
        statusDescription = 'profitable';
    }
    
    const period = isYearlyView ? 'yearly' : 'monthly';
    const summary = `At ${occupancyPercent} occupancy, this ${beds}-bed property generates ${ebitdaText} ${period} EBITDA with ${statusDescription} margins for the owner.`;
    
    document.getElementById('summaryText').textContent = summary;
    document.getElementById('executiveSummary').style.display = 'block';
}

// Generate scenario comparison table
function generateScenarioComparison() {
    const currentOccupancy = parseFloat(occupancySelect.value);
    const scenarios = [0.6, 0.7, 0.8, 0.9, 1.0];
    const tableBody = document.getElementById('scenarioTableBody');
    const isYearlyView = viewSelect.value === 'yearly';
    
    tableBody.innerHTML = '';
    
    scenarios.forEach(occupancy => {
        const result = runScenario(occupancy);
        const row = document.createElement('tr');
        
        if (Math.abs(occupancy - currentOccupancy) < 0.01) {
            row.classList.add('current-occupancy');
        }
        
        const revenue = isYearlyView ? result.yearlyRevenue : result.monthlyRevenue;
        const ebitda = isYearlyView ? result.yearlyEbitda : result.monthlyEbitda;
        const status = isYearlyView ? result.yearlyStatus : result.monthlyStatus;
        
        row.innerHTML = `
            <td>${(occupancy * 100).toFixed(0)}%</td>
            <td>${revenue}</td>
            <td class="ebitda-cell ${result.isPositive ? 'positive' : 'negative'}">${ebitda}</td>
            <td>${status}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    document.getElementById('scenarioComparison').style.display = 'block';
}

// Generate risk signals
function generateRiskSignals() {
    const isYearlyView = viewSelect.value === 'yearly';
    const revenue = parseFloat((isYearlyView ? yearlyRevenueEl : monthlyRevenueEl).textContent.replace('₹', '').replace(/,/g, ''));
    const ebitda = parseFloat((isYearlyView ? yearlyEbitdaEl : ebitdaEl).textContent.replace('₹', '').replace(/,/g, ''));
    const bedOpex = parseFloat(bedOpexInput.value) || 0;
    const occupiedBeds = parseFloat(occupiedBedsEl.textContent) || 0;
    const pricePerBed = parseFloat(pricePerBedInput.value) || 0;
    
    // EBITDA Risk Badge
    const margin = revenue > 0 ? (ebitda / revenue) * 100 : 0;
    const badge = document.getElementById('ebitdaBadge');
    const badgeIcon = document.getElementById('ebitdaBadgeIcon');
    const badgeText = document.getElementById('ebitdaBadgeText');
    
    if (ebitda < 0) {
        badge.className = 'ebitda-badge loss-making';
        badgeIcon.textContent = '🔴';
        badgeText.textContent = 'Loss-making';
    } else if (margin >= 20) {
        badge.className = 'ebitda-badge healthy';
        badgeIcon.textContent = '🟢';
        badgeText.textContent = 'Healthy';
    } else {
        badge.className = 'ebitda-badge thin-margins';
        badgeIcon.textContent = '🟡';
        badgeText.textContent = 'Thin margins';
    }
    
    // Color-coded cards
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(card => {
        card.classList.remove('good', 'warning', 'bad');
        if (ebitda > 0) {
            card.classList.add('good');
        } else {
            card.classList.add('bad');
        }
    });
    
    // Risk Drivers
    const riskDrivers = document.getElementById('riskDrivers');
    riskDrivers.innerHTML = '';
    
    // Opex-heavy: If bed opex > 50% of price per bed
    if (bedOpex > pricePerBed * 0.5) {
        const chip = document.createElement('div');
        chip.className = 'risk-chip';
        chip.textContent = 'Opex-heavy';
        riskDrivers.appendChild(chip);
    }
    
    // Rent-sensitive: If price per bed is high relative to EBITDA per bed
    const ebitdaPerBed = occupiedBeds > 0 ? ebitda / occupiedBeds : 0;
    if (pricePerBed > 15000 && ebitdaPerBed < 2000) {
        const chip = document.createElement('div');
        chip.className = 'risk-chip';
        chip.textContent = 'Rent-sensitive';
        riskDrivers.appendChild(chip);
    }
    
    // Occupancy-sensitive: If EBITDA flips sign between 70-80%
    const scenario70 = runScenario(0.7);
    const scenario80 = runScenario(0.8);
    const ebitda70 = parseFloat((isYearlyView ? scenario70.yearlyEbitda : scenario70.monthlyEbitda).replace('₹', '').replace(/,/g, ''));
    const ebitda80 = parseFloat((isYearlyView ? scenario80.yearlyEbitda : scenario80.monthlyEbitda).replace('₹', '').replace(/,/g, ''));
    
    if ((ebitda70 > 0 && ebitda80 < 0) || (ebitda70 < 0 && ebitda80 > 0)) {
        const chip = document.createElement('div');
        chip.className = 'risk-chip';
        chip.textContent = 'Occupancy-sensitive';
        riskDrivers.appendChild(chip);
    }
    
    document.getElementById('riskSignals').style.display = 'block';
}

// Sync beds and rooms (2 beds per room)
function syncBedsFromRooms() {
    const rooms = parseInt(totalRoomsInput.value) || 0;
    totalBedsInput.value = rooms * 2;
}

function syncRoomsFromBeds() {
    const beds = parseInt(totalBedsInput.value) || 0;
    totalRoomsInput.value = Math.round(beds / 2);
}

// Toggle between monthly and yearly views
function toggleView() {
    if (viewSelect.value === 'monthly') {
        monthlyResults.style.display = 'block';
        yearlyResults.style.display = 'none';
    } else {
        monthlyResults.style.display = 'none';
        yearlyResults.style.display = 'block';
    }
    
    // Update features to reflect current view
    if (document.getElementById('executiveSummary').style.display !== 'none') {
        generateExecutiveSummary();
    }
    if (document.getElementById('scenarioComparison').style.display !== 'none') {
        generateScenarioComparison();
    }
    if (document.getElementById('riskSignals').style.display !== 'none') {
        generateRiskSignals();
    }
}

// Event Listeners
calculateBtn.addEventListener('click', calculateFinancials);

resetBtn.addEventListener('click', resetForm);

// Initialize form with empty values
document.addEventListener('DOMContentLoaded', function() {
    // Clear all input fields
    totalRoomsInput.value = '';
    totalBedsInput.value = '';
    pricePerBedInput.value = '';
    occupancySelect.value = '';
    bedOpexInput.value = '';
    annualSalariesInput.value = '';
    
    // Reset all displayed values to 0 or empty
    resetForm();
});

// View selector
viewSelect.addEventListener('change', toggleView);

// Sync inputs
totalRoomsInput.addEventListener('input', syncBedsFromRooms);
totalBedsInput.addEventListener('input', syncRoomsFromBeds);

// Add input validation on change
const allInputs = document.querySelectorAll('input, select');
allInputs.forEach(input => {
    input.addEventListener('change', validateInputs);
});

// Initialize UI on page load
window.addEventListener('DOMContentLoaded', () => {
    // Set initial view
    toggleView();
    
    // Set initial profit split visualization
    ownerSplitVisual.style.width = '85%';
    operatorSplitVisual.style.width = '15%';
    
    // Hide new sections initially
    document.getElementById('executiveSummary').style.display = 'none';
    document.getElementById('scenarioComparison').style.display = 'none';
    document.getElementById('riskSignals').style.display = 'none';
    
    // Don't perform calculation on page load
    // User needs to click calculate after entering values
});