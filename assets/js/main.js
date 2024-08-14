function Colaborador(codigo, salarioHora, produccionMinima, produccionDia) {
    this.codigo = codigo;
    this.salario_hora = Number(salarioHora);
    this.produccion_minima = Number(produccionMinima);
    this.produccion_dia = Number(produccionDia);

    this.calcularBonificacion = function() {
        if(this.produccion_dia <= this.produccion_minima) {
            return 0;
        }
        var diferencia = this.produccion_dia - this.produccion_minima
        return diferencia * 0.1;
    }

    this.calcularSalarioBase = function () {
        return this.salario_hora * 8;
    }

    this.calcularSalarioNeto = function() {
        return this.calcularBonificacion() + this.calcularSalarioBase();
    }
}

$(function() {

    var colaboradores = [];

    function limpiarFormulario() {
        $("#txt-codigo, #txt-salario-hora, #txt-produccion-minima, #txt-produccion-dia").val("")
    }

    function formatoMoneda({ currency, value}) {
        const formatter = new Intl.NumberFormat('es-CL', {
          style: 'currency',
          minimumFractionDigits: 0,
          currency
        }) 
        return formatter.format(value)
      }

    function listarColaboradores(colaboradores) {
        $("#listado-colaboradores tbody").html("");
        for (const element of colaboradores) {
            var salarioBase = formatoMoneda({currency: "CLP", value: element.calcularSalarioBase()})
            var bonificacion = formatoMoneda({currency: "CLP", value: element.calcularBonificacion()})
            var salarioNeto = formatoMoneda({currency: "CLP", value: element.calcularSalarioNeto()})
            var produccionMinima = formatoMoneda({currency: "CLP", value: element.produccion_minima})
            var produccionDia = formatoMoneda({currency: "CLP", value: element.produccion_dia})
            var salarioHora = formatoMoneda({currency: "CLP", value: element.salario_hora})
            $("#listado-colaboradores tbody").append(`
                <tr>
                    <td>${element.codigo}</td>
                    <td class="text-end">${salarioHora}</td>
                    <td class="text-end">${produccionMinima}</td>
                    <td class="text-end">${produccionDia}</td>
                    <td class="text-end">${salarioBase}</td>
                    <td class="text-end">${bonificacion}</td>
                    <td class="text-end">${salarioNeto}</td>
                </tr>    
            `)
        }
    }

    $("#btn-registrar").click(function(event){
        event.preventDefault();
        var codigo = $("#txt-codigo").val();
        var salarioHora = $("#txt-salario-hora").val();
        var produccionMinima = $("#txt-produccion-minima").val();
        var produccionDia = $("#txt-produccion-dia").val();

        var colaborador = new Colaborador(codigo, salarioHora, produccionMinima, produccionDia)
        colaboradores.push(colaborador)
        limpiarFormulario()
        listarColaboradores(colaboradores)

        console.log(colaboradores);

    })
})


