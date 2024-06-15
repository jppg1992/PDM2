#include <stdio.h>
#include <string.h>
#include <stdlib.h>
int main()
{

    float preco = 0;
    char escolha;
    preco = 1000.00;

    while (escolha != 'D')
    {
        printf("Escolha o uma das opções \n (A)entrada inteira \n (B)Aposentado \n (C)Estudante \n (D)fim \n");
        scanf(" %c", &escolha);
        switch (escolha)
        {
        case 'A':
            printf("O preço do ingresso = R$ : %.2f", preco);
            break;

        case 'B':
            preco = preco * 0.7;
            printf("O preço do ingresso = R$ : %.2f", preco);
            break;

        case 'C':
            preco = preco * 0.5;
            printf("O preço do ingresso = R$ : %.2f", preco);
            break;

        case 'D':
            break;
        default:
        }
    }
}
