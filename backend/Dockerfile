FROM python:3.11-slim

# Set working directory
WORKDIR /backend

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY controllers ./controllers/
COPY database ./database/
COPY models ./models/
COPY routes ./routes/
COPY validations ./validations/
COPY main.py .
COPY exceptions_handler.py .
COPY utils.py .
COPY .env .

# Expose port for fastAPI to run on
EXPOSE ${BACKEND_PORT}

ENV PYTHONPATH=/backend

# Command to run fastAPI with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "${BACKEND_PORT}"]
