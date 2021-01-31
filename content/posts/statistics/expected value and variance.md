---
title: Relationships Between Expected Value and Variance, Covariance, Correlation Coefficient
tags: [Statistics, FRM]
date: 2020-10-30T17:51:16.000+08:00
summary: " "
description: " "
categories: ["日有寸进"]
keywords: [FRM,Expected Value,Variance, Covariance, Correlation Coefficient]
---

# Relationships Between Expected Value and Variance, Covariance, Correlation Coefficient

## Expection

The **expected value** is the <u>weighted average of the possible outcomes of a random variable</u>, where the weights are the probabilities that the outcomes will occur
$$
E(X) = \sum P(x_i)x_i = P(x_1)x_1 + P(x_2)x_2 + ...+ P(x_n)x_n
$$

The symbol $x_n$ represents the $n$ observed value (observation) for random variable $X$;

Mean$(\mu)$ of a equal-weighted random variable:
$$
\mu = E(X)
$$


### useful properties of expected values

1. if $c$ is constant, then 
   $$
   E(cX)=cE(X)
   $$

2. If $X$ and $Y$ are any random variables
   $$
   E(X+Y)= E(X) + E(Y)
   $$
   

## Variance & Standard Deviation

Standard deviation is a measure of the amount of variation or dispersion of a set of values.

**Variance** $(\sigma^2)$ is the <u>average of the squared differences from the mean</u>.

**Standard deviation** $(\sigma)$ is the <u>square root of the variance</u>.
$$
\begin{align*} \\
\sigma^2 &= E([X-E(X)]^2)\\
&= E(X^2-2XE(X)+(E(X))^2)\\
&=E(X^2)-2(E(X))^2+(E(X))^2\\
&=E(X^2) - (E(X))^2
\end{align*}
$$

## Covariance & Correlation Coefficient

Covariance is a measure of the relationship between two random variables

The metric evaluates how much – to what extent – the variables change together.
$$
\begin{align*} 
Cov(X,Y)&=E[(X-E(X))(Y-E(Y))]\\
&=E[XY - XE(Y)-YE(X)+E(X)E(Y)]\\
&=E(XY) - E(X)E(Y) - E(X)E(Y) +E(X)E(Y) \\
&=E(XY) - E(X)E(Y)\\
&=E(XY) - \mu_X\mu_Y
\end{align*}
$$

### useful properties of covariance

1. if $c$ is constant, then 
   $$
   cov(X,a) = 0
   $$

2. $cov(X,X) = var(X)$

3. $cov(aX, bY) = abcov(X,Y)$

4. $cov(X+a, Y+b) = cov(X,Y)$

**Correlation coefficient**$(\rho)$:
$$
\begin{align*} \\
\rho_{X,Y}&=\frac{cov(X,Y)}{\sigma_X\sigma_Y}\\
&=\frac{E[(X-E(X))(Y-E(Y))]}{\sigma_X\sigma_Y}\\
&=\frac{E(XY)-E(X)E(Y)}{\sqrt{E(X^2)-(E(X))^2} \sqrt{E(Y^2)-(E(Y))^2 }}

\end{align*}
$$


