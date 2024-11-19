FROM archlinux:latest
WORKDIR /app
RUN pacman -Sy --noconfirm python python-pip
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]
