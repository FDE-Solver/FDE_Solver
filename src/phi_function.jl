function Phi(y, F, β, t, n, par...)

    alpha = zeros(n - 1)
    fun = zeros(n - 1)

    alpha = map((x) -> α(x, β), n - 1:-1:1)
    fun = map((x) -> F(t, x, β, y, par...), 2:n)

    a_n0(n, β) .* F(t, 1, β, y, par...) .+ sum([alpha[i] .* fun[i] for i in 1:n - 1])

end
