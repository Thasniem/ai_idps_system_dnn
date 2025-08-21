import tensorflow as tf
import numpy as np

# Simple feedforward NN model
def build_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(16, activation='relu', input_shape=(10,)),
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Initialize and train a dummy model
model = build_model()
X = np.random.rand(100, 10)
y = np.random.randint(0, 2, 100)
model.fit(X, y, epochs=5, verbose=0)

def predict(input_data):
    data = np.array(input_data).reshape(1, -1)
    prediction = model.predict(data)
    return float(prediction[0][0])
