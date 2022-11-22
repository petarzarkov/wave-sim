# Wave Simulator
- simulate a string wave using the wave equation

## The Wave Equation
- using the TRUE wave equation (with damping and stress-strain coupling):
$$ \frac{\partial^2 y}{\partial x^2} - \frac{1}{c^2}\frac{\partial^2 y}{\partial t^2} - \gamma \frac{\partial y}{\partial t} -l^2 \frac{\partial^4 y}{\partial x^4} = 0
y(0, t) = y(L, t) = 0
y(x, 0) = f(x) $$

- $y$ is the amplitude of the string
- $x$ is the location of the string
- $t$ is time.

### Parameters:
- $c$ speed of the wave 
- $\gamma$ damping constant 
- $l$ characteristic length (stiffness term) [dimensionless]

### Discrete form:
$$ \frac{y_{j+1}^{m} -2y_j^m + y_{j-1}^{m}}{\Delta x^2} - \frac{1}{c^2}\frac{y_j^{m+1} -2y_j^m + y_j^{m-1}}{\Delta t^2} - \gamma \frac{y_j^{m+1} - y_j^{m-1}}{2 \Delta t} - l^2 \frac{y_{j-2}^m -4y_{j-1}^m +6y_{j}^m -4y_{j+1}^m +y_{j+2}^m}{\Delta x^4} =0 $$

### Solve for $ y_j^{m+1} $ (the amplitude of the string at the next time):
$$ \begin{align*}
y_j^{m+1} &= \left[\frac{1}{c^2 \Delta t^2} + \frac{\gamma}{2 \Delta t} \right]^{-1}\\
& \hspace{10mm} \cdot \left[\frac{1}{\Delta x^2} \left( y_{j+1}^{m} -2y_j^m + y_{j-1}^{m} \right) -\frac{1}{c^2 \Delta t^2} \left( y_j^{m-1} - 2y_j^m \right) + \frac{\gamma}{2 \Delta t}y_j^{m-1} -\frac{l^2}{\Delta x^4} \left( y_{j-2}^m -4y_{j-1}^m +6y_{j}^m -4y_{j+1}^m +y_{j+2}^m \right) \right]
\end{align*} $$


## Converting From Canvas To String Coordinates
### Since the string goes between 0 and 1 in "String Coordinates" $ (x_s, y_s) $
### we can scale to the window "canvas coordinates" $ (x_c, y_c) $
### as follows:

$$ x_c = C_w \cdot x_s $$
$$ y_c = C_w \cdot y_s + C_h / 2 $$ 
where $ C_w $ and $ C_h $ are the width and height of the canvas in pixels