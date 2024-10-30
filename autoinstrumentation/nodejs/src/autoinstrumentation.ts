import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-grpc';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";

const getMetricExporter = () => {
    if (process.env.OTEL_METRICS_EXPORTER === 'prometheus') {
        return new PrometheusExporter();
    }
    return undefined;
};

const sdk = new NodeSDK({
    autoDetectResources: true,
    instrumentations: [getNodeAutoInstrumentations()],
    traceExporter: new OTLPTraceExporter(),
    metricExporter: getMetricExporter()
});

sdk.start();
