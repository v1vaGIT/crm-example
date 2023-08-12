import {QuotaVolumeTable} from '../../tables/QuotaVolumeTable/QuotaVolumeTable'
import {PortCallsTable} from '../../tables/PortCallsTable/PortCallsTable'
import {DailyCatchTable} from '../../tables/DailyCatchTable/DailyCatchTable'
import {AllowedFishingTimeTable} from '../../tables/AllowedFishingTimeTable/AllowedFishingTimeTable'
import {TransitionTimelineTable} from '../../tables/TransitionTimelineTable/TransitionTimelineTable'
import {FuelUseTable} from '../../tables/FuelUseTable/FuelUseTable'
import {ProductMixTable} from '../../tables/ProductMixTable/ProductMixTable'
import {SensitiveCoefficientsTable} from '../../tables/ProductionCoefficientsTable/SensitiveCoefficientsTable'
import {NonSensitiveCoefficientsTable} from '../../tables/ProductionCoefficientsTable/NonSensitiveCoefficientsTable'
import {FreightRate} from '../../tables/FreightRate/FreightRate'
import {CurrencyRate} from '../../tables/CurrencyRate/CurrencyRate'
import {SellingExpenses} from '../../tables/SellingExpenses/SellingExpenses'
import {Tare} from '../../tables/Tare/Tare'
import {Supply} from '../../tables/Supply/Supply'
import {IndustrialArmament} from '../../tables/IndustrialArmament/IndustrialArmament'
import {VbrTax} from '../../tables/VbrTax/VbrTax'
import {Food} from '../../tables/Food/Food'
import {SharesNumber} from '../../tables/SharesNumber/SharesNumber'
import {CostSharesByVessels} from '../../tables/CostSharesByVessels/CostSharesByVessels'
import {CaptainBonus} from '../../tables/CaptainBonus/CaptainBonus'
import {FuelCost} from '../../tables/FuelCost/FuelCost'
import {ProductPrices} from '../../tables/ProductPrices/ProductPrices'
import {PriceDiscountPerVessel} from '../../tables/PriceDiscountPerVessel/PriceDiscountPerVessel'
import {CostPortTransitionDowntime} from '../../tables/CostPortTransitionDowntime/CostPortTransitionDowntime'
import {FilletRawDistribution} from '../../tables/FilletRawDistribution/FilletRawDistribution'
import {AdditionalProductLimitations} from '../../tables/AdditionalProductLimitations/AdditionalProductLimitations'
import {VarietyDistribution} from '../../tables/VarietyDistribution/VarietyDistribution'
import {OptimizeEconomicResults} from '../../tables/OptimizeEconomicResults/OptimizeEconomicResults'

const tables = {
    // ДУФ
    'quota-volume': QuotaVolumeTable, // numeric
    'port-calls': PortCallsTable, // merge
    'daily-catch': DailyCatchTable, // simple
    'allowed-fishing-time': AllowedFishingTimeTable, // simple
    'transition-timeline': TransitionTimelineTable, // symmetrical
    // ТД
    'fuel-use': FuelUseTable, // simple
    // ПД
    'product-mix': ProductMixTable, // simple
    sensitive: SensitiveCoefficientsTable, // simple
    'not-sensitive': NonSensitiveCoefficientsTable, // simple
    'fillet-raw-distribution': FilletRawDistribution, // simple
    'additional-product-limitations': AdditionalProductLimitations, // simple
    'variety-distribution': VarietyDistribution, // his own
    // ФЭД
    'currency-rate': CurrencyRate, // simple
    'freight-rate': FreightRate, // numeric
    'selling-expenses': SellingExpenses, // numeric
    tare: Tare, // simple
    supply: Supply, // numeric
    'industrial-armament': IndustrialArmament, // simple
    'vbr-tax': VbrTax, // numeric
    food: Food, // simple
    'fuel-cost': FuelCost, // numeric
    'cost-port-transition-downtime': CostPortTransitionDowntime, // numeric
    // Кадры
    'shares-number': SharesNumber, // numeric
    'cost-shares-by-vessels': CostSharesByVessels, // numeric
    'captain-bonus': CaptainBonus, // simple
    // Продавцы
    'product-prices': ProductPrices, // numeric
    'price-discount-per-vessel': PriceDiscountPerVessel, // simple
    'optimize-economic-results': OptimizeEconomicResults, // his own
}

export {tables}
