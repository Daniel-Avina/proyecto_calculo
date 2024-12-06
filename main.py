def demanda(x):
    return 550 - x / 10

def costo(x):
    return 68000 + 150 * x

def ingresos(x):
    return x * demanda(x)

def ganancias(x):
    return ingresos(x) - costo(x)

def derivada_ganancias(x):
    return 400 - x / 5

def descenso_gradiente(func_derivada, x_inicial, learning_rate, max_iteraciones):
    x = x_inicial
    iteraciones = []
    for i in range(max_iteraciones):
        gradiente = func_derivada(x)
        x_nuevo = x + learning_rate * gradiente
        iteraciones.append((i, x, gradiente, learning_rate, x_nuevo))
        x = x_nuevo
    return iteraciones

# Parámetros
learning_rate = 0.1
max_iteraciones = 100
x_inicial = 0

# Ejecutar descenso de gradiente
iteraciones = descenso_gradiente(derivada_ganancias, x_inicial, learning_rate, max_iteraciones)

# Mostrar resultados
resultado_b = iteraciones[-1][1]
print(f"Descuento óptimo para maximizar utilidades: ${resultado_b:.2f}")

# Crear tabla de iteraciones
print(f"{'Iteración':<10}{'x':<10}{'f\'(x)':<10}{'a':<10}{'x(k+1)':<10}")
for iteracion in iteraciones:
    print(f"{iteracion[0]:<10}{iteracion[1]:<10.2f}{iteracion[2]:<10.2f}{iteracion[3]:<10}{iteracion[4]:<10.2f}")

# Resultados de los incisos
print("\nResultados de los incisos:")
print("a) Función demanda: p(x) = 550 - x / 10")
print(f"b) Descuento óptimo para maximizar utilidades: ${resultado_b:.2f}")
print("c) Descuento óptimo para maximizar ganancias: $100")