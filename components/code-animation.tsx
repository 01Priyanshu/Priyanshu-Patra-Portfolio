"use client"

import { useEffect, useState } from "react"

export default function CodeAnimation() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const codeSnippet = `
# Data Science Portfolio
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split

# Load and prepare data
data = pd.read_csv('dataset.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

# Compile model
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train model
history = model.fit(
    X_train, y_train,
    epochs=10,
    validation_data=(X_test, y_test)
)

print("Model training complete!")
`

  useEffect(() => {
    let currentIndex = 0
    let timer: NodeJS.Timeout

    // Type out the code
    const typeCode = () => {
      if (currentIndex < codeSnippet.length) {
        setText(codeSnippet.slice(0, currentIndex + 1))
        currentIndex++
        timer = setTimeout(typeCode, Math.random() * 30 + 10) // Random typing speed for realism
      }
    }

    typeCode()

    // Blink cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <div className="w-full h-full bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-primary/20">
      <div className="bg-[#333333] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white/70 text-xs ml-2">data_science_model.py</div>
      </div>
      <div className="p-4 text-xs md:text-sm font-mono text-white/90 overflow-auto h-[calc(100%-2rem)]">
        <pre className="whitespace-pre-wrap">
          {text}
          {cursorVisible && <span className="text-primary animate-pulse">|</span>}
        </pre>
      </div>
    </div>
  )
}
