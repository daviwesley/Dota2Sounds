import os

a = os.listdir()
dados = []

for i in a:
    dict_ = {
        'title': i.replace('.mp3', ''),
        'url': i,
        'basePath': 'Sound.MAIN_BUNDLE',
    }
    dados.append(dict_)

print(dados)