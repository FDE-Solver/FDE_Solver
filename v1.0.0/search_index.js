var documenterSearchIndex = {"docs":
[{"location":"intro/#FdeSolver","page":"Home","title":"FdeSolver","text":"","category":"section"},{"location":"intro/","page":"Home","title":"Home","text":"(Image: Stable) (Image: CI) (Image: codecov)","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"This is a Pkg in Julia for solution to a class of fractional differential equations and system equations. Many advanced source codes are available in MATLAB, but they are not open source projects like this one in Julia. Hence, the purpose is to develop a Julia package that numerically solves nonlinear fractional ordinary differential equations.","category":"page"},{"location":"intro/#Method","page":"Home","title":"Method","text":"","category":"section"},{"location":"intro/","page":"Home","title":"Home","text":"We implement the predictor-corrector algorithms that the convergence and accuracy has been studied here. Interested readers can also find the stability of the methods and see how to implement the methods for solving multi-term fractional differential equations.","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"Let us suppose the following initial value problem","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"_CD_t_0^betay(t)=f(ty(t))","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"with the initial condition","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"y(t_0)=y_0y^(1)(t_0)=y^(1)_0y^(m-1)(t_0)=y^(m-1)_0","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"in which","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"_CD_t_0^beta  beta0","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"the Caputo fractional derivative and m the upper integer of the order of derivative.","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"We solve the problem by using predictor-corrector method (the equation (14) from this paper).","category":"page"},{"location":"intro/#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"intro/","page":"Home","title":"Home","text":"If Julia is installed correctly, you can import FdeSolver.jl as:","category":"page"},{"location":"intro/","page":"Home","title":"Home","text":"import Pkg; Pkg.add(\"FdeSolver\")\n# or\n]add FdeSolver","category":"page"},{"location":"examples/#API","page":"Examples","title":"API","text":"","category":"section"},{"location":"examples/#Example-1:-[Fractional-nonlinear-equation](https://link.springer.com/article/10.1023/B:NUMA.0000027736.85078.be)","page":"Examples","title":"Example 1: Fractional nonlinear equation","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"0betaleq1","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"subject to the initial condition","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"y(0)=0","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The exact solution is","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"y(t)=t^8-3t^4+beta2+94t^beta","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FdeSolver\nusing Plots, SpecialFunctions\n\n# Inputs\ntSpan = [0, 1]     # [intial time, final time]\ny0 = 0             # initial value\nβ = 0.9            # order of the derivative\n\n# ODE Model\npar = β\nF(t, y, par) = (40320 ./ gamma(9 - par) .* t .^ (8 - par) .- 3 .* gamma(5 + par / 2)\n           ./ gamma(5 - par / 2) .* t .^ (4 - par / 2) .+ 9/4 * gamma(par + 1) .+\n           (3 / 2 .* t .^ (par / 2) .- t .^ 4) .^ 3 .- y .^ (3 / 2))\n\n## Numerical solution\nt, Yapp = FDEsolver(F, tSpan, y0, β)\n\n# Plot\nplot(t, Yapp, linewidth = 5, title = \"Solution of a 1D fractional IVP\",\n     xaxis = \"Time (t)\", yaxis = \"y(t)\", label = \"Approximation\")\nplot!(t, t -> (t.^8 - 3 * t .^ (4 + β / 2) + 9/4 * t.^β),\n      lw = 3, ls = :dash, label = \"Exact solution\")","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Numerical solution of example 1)","category":"page"},{"location":"examples/#Example-2:-[Lotka-Volterra-predator-prey](https://mc-stan.org/users/documentation/case-studies/lotka-volterra-predator-prey.html)","page":"Examples","title":"Example 2: Lotka-Volterra-predator-prey","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FdeSolver\nusing Plots\n\n# Inputs\ntSpan = [0, 25]                    # [intial time, final time]\ny0 = [34, 6]                       # initial values\nβ = [0.98, 0.99]                   # order of derivatives\npar = [0.55, 0.028, 0.84, 0.026]   # model parameters\n\n# ODE Model\nfunction F(t, y, par)\n\n    α1 = par[1]      # growth rate of the prey population\n    β1 = par[2]      # rate of shrinkage relative to the product of the population sizes\n    γ = par[3]       # shrinkage rate of the predator population\n    δ = par[4]       # growth rate of the predator population as a factor of the product\n                     # of the population sizes\n\n    u = y[1]         # population size of the prey species at time t[n]\n    v = y[2]         # population size of the predator species at time t[n]\n\n    F1 = α1 .* u .- β1 .* u .* v\n    F2 = - γ .* v .+ δ .* u .* v\n\n    [F1, F2]\n\nend\n\n## Solution\nt, Yapp = FDEsolver(F, tSpan, y0, β, par)\n\n# Plot\nplot(t, Yapp, linewidth = 5, title = \"Solution to LV model with 2 FDEs\",\n     xaxis = \"Time (t)\", yaxis = \"y(t)\", label = [\"Prey\" \"Predator\"])\nplot!(legendtitle = \"Population of\")","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Numerical solution of example 2)","category":"page"},{"location":"examples/#Example-3:-[SIR-model](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology)","page":"Examples","title":"Example 3: SIR model","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"One application of using fractional calculus is taking into account effects of memory in modeling including epidemic evolution.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"By defining the Jacobian matrix, users can achieve a faster convergence based on the modified Newton–Raphson method.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FdeSolver\nusing Plots\n\n# Inputs\nI0 = 0.001             # intial value of infected\ntSpan = [0, 100]       # [intial time, final time]\ny0 = [1 - I0, I0, 0]   # initial values [S0,I0,R0]\nα = [1, 1, 1]          # order of derivatives\nh = 0.1                # step size of computation (default = 0.01)\npar = [0.4, 0.04]      # parameters [β, recovery rate]\n\n## ODE model\nfunction F(t, y, par)\n\n    # parameters\n    β = par[1]    # infection rate\n    γ = par[2]    # recovery rate\n\n    S = y[1]   # Susceptible\n    I = y[2]   # Infectious\n    R = y[3]   # Recovered\n\n    # System equation\n    dSdt = - β .* S .* I\n    dIdt = β .* S .* I .- γ .* I\n    dRdt = γ .* I\n\n    return [dSdt, dIdt, dRdt]\n\nend\n\n## Jacobian of ODE system\nfunction JacobF(t, y, par)\n\n    # parameters\n    β = par[1]     # infection rate\n    γ = par[2]     # recovery rate\n\n    S = y[1]    # Susceptible\n    I = y[2]    # Infectious\n    R = y[3]    # Recovered\n\n    # System equation\n    J11 = - β * I\n    J12 = - β * S\n    J13 =  0\n    J21 =  β * I\n    J22 =  β * S - γ\n    J23 =  0\n    J31 =  0\n    J32 =  γ\n    J33 =  0\n\n    J = [J11 J12 J13\n         J21 J22 J23\n         J31 J32 J33]\n\n    return J\n\nend\n\n## Solution\nt, Yapp = FDEsolver(F, tSpan, y0, α, par, JF = JacobF, h = h)\n\n# Plot\nplot(t, Yapp, linewidth = 5, title = \"Numerical solution of SIR model\",\n     xaxis = \"Time (t)\", yaxis = \"SIR populations\", label=[\"Susceptible\" \"Infectious\" \"Recovered\"])","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Numerical solution of example 3)","category":"page"},{"location":"examples/#Example-4:-[Dynamics-of-interaction-of-N-species-microbial-communities](https://www.biorxiv.org/content/10.1101/2021.09.01.458486v1.abstract)","page":"Examples","title":"Example 4: Dynamics of interaction of N species microbial communities","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"The impact of ecological memory on the dynamics of interacting communities can be quantified by solving fractional form ODE systems.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using FdeSolver\nusing Plots\n\n## inputs\ntSpan = [0, 50]   # time span\nh = 0.1           # time step\nN = 20            # number of species\nβ = ones(N)       # order of derivatives\nX0 = 2 * rand(N)  # initial abundances\n\n# parametrisation\npar = [2,\n       2 * rand(N),\n       rand(N),\n       4 * rand(N, N),\n       N]\n\n# ODE model\nfunction F(t, x, par)\n\n    l = par[1] # Hill coefficient\n    b = par[2] # growth rates\n    k = par[3] # death rates\n    K = par[4] # inhibition matrix\n    N = par[5] # number of species\n\n    Fun = zeros(N)\n\n    for i in 1:N\n\n        # inhibition functions\n        f = prod(K[i, 1:end .!= i] .^ l ./\n             (K[i, 1:end .!= i] .^ l .+ x[ 1:end .!= i] .^l))\n\n        # System of equations\n        Fun[i] = x[ i] .* (b[i] .* f .- k[i] .* x[ i])\n\n    end\n\n    return Fun\n\nend\n\n# Solution\nt, Xapp = FDEsolver(F, tSpan, X0, β, par, h = h, nc = 3, tol = 10e-9)\n\n# Plot\nplot(t, Xapp, linewidth = 5,\n     title = \"Dynamics of microbial interaction model\",\n     xaxis = \"Time (t)\")\n     yaxis!(\"Log Abundance\", :log10, minorgrid = true)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: Numerical solution of example 4)","category":"page"},{"location":"#FdeSolver.jl","page":"Manual","title":"FdeSolver.jl","text":"","category":"section"},{"location":"","page":"Manual","title":"Manual","text":"Let's solve some differential equations!","category":"page"},{"location":"#Package-features","page":"Manual","title":"Package features","text":"","category":"section"},{"location":"","page":"Manual","title":"Manual","text":"Solve fractional calculus problems","category":"page"},{"location":"#Function-Documentation","page":"Manual","title":"Function Documentation","text":"","category":"section"},{"location":"","page":"Manual","title":"Manual","text":"FDEsolver(F::Function, tSpan::Vector{<:Real}, y0::Union{Real, Vector{<:Real}, Matrix{<:Real}}, β::Union{Real, Vector{<:Real}}, par...; h = 2^-6, nc = 2, JF = nothing, StopIt = \"Standard\", tol = 10e-6, itmax = 100)","category":"page"},{"location":"#FdeSolver.FDEsolver-Tuple{Function, Vector{var\"#s1\"} where var\"#s1\"<:Real, Union{Real, VecOrMat{var\"#s3\"} where var\"#s3\"<:Real}, Union{Real, Vector{var\"#s4\"} where var\"#s4\"<:Real}, Vararg{Any, N} where N}","page":"Manual","title":"FdeSolver.FDEsolver","text":"FDEsolver(F::Function, tSpan::Vector{<:Real}, y0::Union{Real, Vector{<:Real}, Matrix{<:Real}}, β::Union{Real, Vector{<:Real}}, par...; h = 2^-6, nc = 2, JF = nothing, StopIt = \"Standard\", tol = 10e-6, itmax = 100)\n\nSolves fractional differential equations with a predictor-corrector approach.\n\nArguments\n\nF::Function: the right side of the system of differential equations. It must be expressed  in the form of a function and return a vector function with the same number of  entries of order of derivatives. This function can also include a vector of  parameters: par... .\ntSpan::Vector{<:Real}: the time span along which computation is performed.\ny0::Union{Real, Vector{<:Real}, Matrix{<:Real}}: the initial values in the form of a  row vector (Vector{<:Real}) for β = 1 and a matrix (Matrix{<:Real}) for β  1,  where each column corresponds to the initial values of one differential equation and  each row to the order of derivation.\nβ::Union{Real, Vector{<:Real}}: the orders of derivation in the form of a row vector, where  each element corresponds to the order of one differential equation. It can take  decimal as well as integer values.\nJF::Function: the Jacobian of F. If not provided, the solver will evaluate the solution  without the aid of the Jacobian matrix.\npar...: additional parameters for the function F.\nh::Real: the step size for correction.\nnc::Int64: the desired number of corrections.\nStopIt::String: the method to stop correction. It can take either \"Standard\"  (by default) or \"Convergence\". In the former case, the function will repeat  correction as many times as specified in nc; in the latter case, correction will  stop only when tolerance (tol) or the iteration max (itmax) is reached.\ntol::Float64: the tolerance.\nìtmax::Int64: the maximal number of iterations.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Manual","title":"Manual","text":"To access the manual of FDEsolver from the Julia REPL, type:","category":"page"},{"location":"","page":"Manual","title":"Manual","text":"?FDESolver","category":"page"}]
}
