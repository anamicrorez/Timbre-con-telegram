//Programa: Módulo TM1638 con Arduino
//Autor: Arduino e Cia

#include <TM1638lite.h>

// Conexión de los pines STB, CLK y DO
TM1638lite tm(4, 7, 8);
int buzzer = 9;


void setup() {
  Serial.begin(9600);
  tm.reset();

  pinMode(buzzer, OUTPUT);
  // Mensaje inicial
}

void loop() {
  // Verifica si algún botón fue presionado
  uint8_t buttons = tm.readButtons();
  // Enciende el LED correspondiente
  //doLEDs(buttons);
  tm.displayText("Tocar");
  //Serial.print(buttons);
  //Serial.print("\n");
  
  if (buttons == 1) 
  {
    buttons = 1;
    Load(buttons);
  }
  else if (buttons == 2) 
  {
    buttons = 2;
    Load(buttons);
  }
  else if (buttons == 4) 
  {
    buttons = 3;
    Load(buttons);
  }
  else if (buttons == 8) 
  {
    buttons = 4;
    Load(buttons);
  }
  else if (buttons == 16) 
  {
    buttons =5;
    Load(buttons);
  }
  else if (buttons == 32) 
  {
    buttons = 6;
    Load(buttons);
  }
  else if (buttons == 64) 
  {
    buttons = 7;
    Load(buttons);
  }
  else if (buttons == 128) 
  {
    buttons = 8;
    Load(buttons);
  }
}

void Load(uint8_t value) 
{
    //Serial.print(value);
    tm.displayText("Casa");
    tm.displayHex(0x05, value);
    Serial.println(value);
    value = value-1;
    tm.setLED(value, 1);
    Tono();
    delay(1000);
    tm.setLED(value, 0);
    noTone(buzzer);
}

void Tono()
{
  tone(buzzer, 600);
  delay(200);
  tone(buzzer, 300);
}
