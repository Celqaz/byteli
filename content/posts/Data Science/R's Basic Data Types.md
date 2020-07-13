---
title: R's Basic Data Types
tags: [Data Science, R]
date: 2020-07-11T23:42:34.000+08:00 
categories: ["Hello World"]
description: "Brief introduction of R's basic data types."
keywords: [Data Science, R]
---



## 

# R's Basic Data Types

## Atomic Classes

- character
- numeric( real numbers)

    ```r
    # Inf represents  infinity
    > 1/0
    [1] Inf
    > 1 / Inf
    [1] 0
    ```

- integer
- complex( complex number )
- logical( True/False)

## Vector and List

*Vector* contains the same types of data，while *list* could contains different kinds of data.

```r
> x = 0:3
> x
[1] 0 1 2 3
> as.character(x)
[1] "0" "1" "2" "3"
> as.logical(x)
[1] FALSE  TRUE  TRUE  TRUE
```

## Matrices

Just like multidimensional arrays in Python.

Matrices must have every element be the same class

```r
# matrix method
> m <- matrix(1:6, nrow = 2, ncol = 3)
> m
[,1] [,2] [,3]
[1,] 1 3 5
[2,] 2 4 6
```

```r
# dim() method
> m =1:10
> m
[1] 1 2 3 4 5 6 7 8 9 10
> dim(m) = c(2,5) # use dim() to determine dimension 
> m
[,1] [,2] [,3] [,4] [,5]
[1,] 1 3 5 7 9
[2,] 2 4 6 8 10
```

```r
# cbind & rbind
> x = 1:3
> y = 10:12
> cbind(x, y)
x y
[1,] 1 10
[2,] 2 11
[3,] 3 12
> rbind(x,y)
[,1] [,2] [,3]
x 1 2 3
y 10 11 12
```

## Factors

Factors are used to represent categorical data. Factors can be unordered or ordered. One can think of *a factor as an integer vector where each integer has a **label**.*

Factors are self-describing; having a variable that has values “Male” and “Female” is better than a variable that has values 1 and 2.

```r
# unordered factors
> x <- factor(c("yes", "yes", "no", "yes", "no"))
> x
[1] yes yes no yes no
Levels: no yes # levels ordered alphabetically by default
> table(x)
x
no yes
2 3
> unclass(x)
[1] 2 2 1 2 1
attr(,"levels")
[1] "no" "yes"
```

The order of the levels can be set using the levels argument to *factor().* This can be important in linear modeling because the first level is used as the baseline level.

```r
x <- factor(c("yes", "yes", "no", "yes", "no"), levels = c("yes", "no"))
> x
[1] yes yes no yes no
Levels: yes no # ordered as set
```

## Missing Values

NA or NaN :

- NaN: not a number. Used undefined mathematical operations.
- NA: not available. Used for everything else other than NaN.

    NA values have a class also, so there are integer NA, character NA

```r
# NaN ⊂ NA
> x <- c(1, 2, NaN, NA, 4)
> [is.na](http://is.na/)(x)
[1] FALSE FALSE TRUE TRUE FALSE
> is.nan(x)
[1] FALSE FALSE TRUE FALSE FALSE
```

## Data Frames

Data frames are used to *store tabular data.*

Unlike matrices, data frames *can store different classes of objects in each column* (just like lists)

```r
> x <- data.frame(foo = 1:4, bar = c(T, T, F, F))
> x
foo bar
1 1 TRUE
2 2 TRUE
3 3 FALSE
4 4 FALSE
> nrow(x)
[1] 4
> ncol(x)
[1] 2
```

## Names Attribute

R objects can also have names, which is very useful for writing readable code and self-describing objects.

```r
# vector
> x<- 1:3
> x
[1] 1 2 3
> names(x) <- c('name_a', 'name_b', 'name_c')
> x
name_a name_b name_c
1 2 3
> names(x)
[1] "name_a" "name_b" "name_c"
```

```r
# list
> x <- list(a = 1, b = 2, c = 3)
> x
$a
[1] 1
$b
[1] 2
$c
[1] 3
```

```r
# matrices
> m <- matrix(1:4, nrow = 2, ncol = 2)
> dimnames(m) <- list(c("a", "b"), c("c", "d"))
> m
c d
a 1 3
b 2 4
```