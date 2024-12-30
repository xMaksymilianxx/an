class LearningSystem {
    constructor() {
        this.modelData = this.loadModelData();
        this.accuracy = 0;
        this.predictions = [];
    }

    loadModelData() {
        const savedData = localStorage.getItem('modelData');
        return savedData ? JSON.parse(savedData) : {
            weights: {
                form: 0.3,
                h2h: 0.2,
                stats: 0.3,
                odds: 0.2
            },
            history: [],
            accuracy: 0
        };
    }

    saveModelData() {
        localStorage.setItem('modelData', JSON.stringify(this.modelData));
    }

    addPrediction(prediction, matchData) {
        this.predictions.push({
            prediction,
            matchData,
            timestamp: new Date().toISOString()
        });
    }

    updateModel(predictionId, actualResult) {
        const prediction = this.predictions.find(p => p.id === predictionId);
        if (!prediction) return;

        const success = this.evaluatePrediction(prediction, actualResult);
        this.updateWeights(prediction, success);
        this.updateAccuracy(success);
        this.saveModelData();
    }

    evaluatePrediction(prediction, actualResult) {
        // Implementacja oceny predykcji
        return true;
    }

    updateWeights(prediction, success) {
        const learningRate = 0.01;
        const weights = this.modelData.weights;

        if (!success) {
            Object.keys(weights).forEach(factor => {
                const error = prediction[factor].confidence - (success ? 1 : 0);
                weights[factor] -= learningRate * error;
            });

            // Normalizacja wag
            const sum = Object.values
