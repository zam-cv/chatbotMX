batery_alert = ['batería', 'alternador', 'carga', 'pila', 'eléctrico', 'vehículo', 'drenaje', '(+)','(-)', 'signo']
direccionales = ['flechas', 'flecha','izquierda', 'derecha', 'vehículo', 'direccionales', 'lados','expandir', 'resolucion','cambiar', 'carril']
signal_trafico = ['120', 'kilómetros', 'tráfico', 'velocidad', 'máxima', 'superar', 'límites','límite']
suministro_energia = ['signo', 'exclamación', 'batería', 'fallando','carga']
falla_direccion = ['volante', 'exclamación', 'advertencias','advertencia', 'girar', 'giro', 'dirección', 'conducir', 'asistida']
estacionamiento_electrico = ['freno', 'mano', 'estacionamiento', 'tablero', 'activado', 'frenado', 'ilumina', 'sistema']
advertencia_cinturon = ['cinturón', 'seguridad', 'vehículo', 'cinturones', 'abrochados','recordatorio', 'iluminado', 'detección']
sobrecalentamiento_electromotor = ['calentamiento', 'asientos', 'sobrecalentamiento', 'avtivada', 'calor', 'calientan', 'motor', 'sobrecalentándose', 'refrigeración']
sistema_energia = ['presión', 'neumáticos', 'baja', 'aire', ]






conta =0
conta1 =0
conta2 =0
conta3 =0
conta4 =0
conta5=0
conta6 = 0
conta7 = 0

a = str(input())
vec = []

vec = a.split()

for i in range(len(vec)):
    if(vec[i].lower() in batery_alert):
        conta = conta +1
    if(vec[i].lower() in direccionales):
        conta1 = conta1 +1
    if(vec[i].lower() in signal_trafico):
        conta2 = conta2 +1
    if(vec[i].lower() in suministro_energia):
        conta3 = conta3 +1
    if(vec[i].lower() in falla_direccion):
        conta4 = conta4 +1
    if(vec[i].lower() in estacionamiento_electrico):
        conta5 = conta5 +1
    if(vec[i].lower() in advertencia_cinturon):
        conta6 = conta6 +1
    if(vec[i].lower() in advertencia_cinturon):
        conta7 = conta7 +1
        
if(conta >= 3):
    print("problema de bateria")
elif(conta1 >= 3):
    print("direccionales")
elif(conta2 >= 3):
    print("señal de trafico")
elif(conta3 >= 3):
    print("suministro de energia")
elif(conta4 >= 3):
    print("falla de direccion")
elif(conta5 >= 3):
    print("estacionamiento electrico")
elif(conta6 >= 3):
    print("advertencia de cinturon")	
elif(conta7 >= 3):
    print("sobrecalentamiento de motor")	
        
        
        
















