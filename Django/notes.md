# Anotações de Django
## Módulo básico

### Criando projeto
```bash
python -m venv (nome)        # cria o ambiente virtual
. (nome)/bin/activate        # ativa o venv (Linux/Mac)
pip install django           # instala o Django no venv
django-admin startproject (nome) .   # cria o projeto (o ponto evita subpasta extra)
```

### Rodando servidor
```bash
python manage.py runserver   # sobe o servidor de desenvolvimento em localhost:8000
python manage.py runserver 0.0.0.0:8080  # especificando host e porta
```

---

### Padrão MVT
O Django segue o padrão **MVT (Model - View - Template)**, variação do MVC:

| Camada | Responsabilidade |
|--------|-----------------|
| **Model** | Define a estrutura dos dados e a lógica de negócio; mapeado para o banco via ORM |
| **View** | Recebe a requisição, processa (consultando models se necessário) e retorna uma resposta |
| **Template** | Camada de apresentação; HTML com tags e filtros do Django Template Language (DTL) |

O **Django** em si faz o papel do *Controller*, roteando requisições às views corretas via `urls.py`.

---

### Function Based View, HttpRequest e HttpResponse
Views baseadas em função são o jeito mais simples de criar uma view:

```python
from django.http import HttpRequest, HttpResponse

def minha_view(request: HttpRequest) -> HttpResponse:
    return HttpResponse("<h1>Olá, mundo!</h1>")
```

**HttpRequest** — objeto criado automaticamente pelo Django com informações da requisição:
- `request.method` → `"GET"`, `"POST"`, etc.
- `request.GET` / `request.POST` → dicionários com parâmetros
- `request.user` → usuário autenticado
- `request.headers` → cabeçalhos HTTP

**HttpResponse** — objeto de resposta que a view deve retornar:
- `HttpResponse(content, content_type, status)` → resposta genérica
- Subclasses úteis: `JsonResponse`, `HttpResponseRedirect`, `HttpResponseNotFound`

---

### URLs e URLs aninhadas (path → include)
O roteamento é feito em `urls.py` com a função `path()`:

```python
# projeto/urls.py
from django.urls import path, include

urlpatterns = [
    path("artigos/", include("artigos.urls")),  # delega para o urls.py do app
]
```

```python
# artigos/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("", views.lista, name="artigos-lista"),
    path("<int:id>/", views.detalhe, name="artigos-detalhe"),
]
```

- `include()` permite modularizar as rotas por app, mantendo o `urls.py` principal limpo.
- `<int:id>` é um **conversor de path** — captura o trecho da URL e passa como argumento à view. Outros conversores: `str`, `slug`, `uuid`, `path`.
- O argumento `name` permite referenciar a URL por nome nos templates com `{% url 'nome' %}`.

---

### Render e Templates

`render()` é um atalho que combina carregar um template, passar contexto e retornar um `HttpResponse`:

```python
from django.shortcuts import render

def lista(request):
    contexto = {"artigos": Artigo.objects.all()}
    return render(request, "artigos/lista.html", contexto)
```

No template, as variáveis do contexto são acessadas com `{{ variavel }}` e a lógica com `{% tag %}`:

```html
{% for artigo in artigos %}
  <h2>{{ artigo.titulo }}</h2>
{% endfor %}
```

#### Padrão de organização de templates do Django
- Criar uma pasta `templates/` dentro de cada app
- Dentro dela, criar um subdiretório com o mesmo nome do app
- Isso evita ambiguidade caso dois apps tenham templates com o mesmo nome (ex: `lista.html`), já que o Django os diferenciará pelo caminho `artigos/lista.html` vs `outro_app/lista.html`.

---

### Templates globais com DIRS e herança de templates

Para templates compartilhados entre vários apps (ex: `base.html`), cria-se uma pasta global e registra-se em `settings.py`:

```python
# settings.py
TEMPLATES = [
    {
        ...
        "DIRS": [BASE_DIR / "templates"],  # pasta global na raiz do projeto
        ...
    }
]
```

**Herança de templates** evita repetição de HTML comum (navbar, footer, head):

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html>
  <head><title>{% block titulo %}Meu Site{% endblock %}</title></head>
  <body>
    {% block conteudo %}{% endblock %}
  </body>
</html>
```

```html
<!-- artigos/templates/artigos/lista.html -->
{% extends "base.html" %}

{% block titulo %}Lista de Artigos{% endblock %}

{% block conteudo %}
  <h1>Artigos</h1>
{% endblock %}
```

- `{% extends %}` deve ser sempre a **primeira linha** do template filho.
- `{% block %}` define regiões substituíveis. O conteúdo definido no pai é o valor padrão caso o filho não sobrescreva.

---

### Arquivos parciais (partials) e include

Partials são fragmentos de template reutilizáveis (ex: card de produto, navbar, paginação).

Convenção: prefixar com `_` para indicar que são parciais (não renderizados diretamente).

Inclusão com `{% include %}`:

```html
<!-- base.html -->
{% include "partials/_navbar.html" %}

<main>{% block conteudo %}{% endblock %}</main>

{% include "partials/_footer.html" %}
```

Passando variáveis extras para o partial:

```html
{% include "partials/_card_artigo.html" with artigo=artigo destacado=True %}
```

- Por padrão o partial herda todo o contexto da view; `with` adiciona ou sobrescreve variáveis.
- `only` restringe o contexto apenas ao que for passado explicitamente: `{% include "..." with x=1 only %}`.