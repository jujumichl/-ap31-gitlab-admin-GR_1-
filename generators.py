from customblocks.utils import E, Markdown
#https://github.com/carpedm20/emoji/

def svg_icon(path):
    return E('span.twemoji',
        E('svg', dict(viewBox="0 0 24 24",xmlns="http://www.w3.org/2000/svg"),
            E('path', dict(d=path)))
        )

class Exercice:

    def __init__(self, ctx, args, kwds):
        self.ctx = ctx
        self.classes = []
        self.id = ''
        # Handle arguments
        self.collapse = 'collapse' in args
        for arg in args:
            # classes starts with .
            if arg.startswith('.'):
                self.classes.append(arg)
            # id starts with # 
            # We only keep last one
            elif arg.startswith('#'):
                self.id = arg[1:]
            # last non class or id argument is title
            # Other get lost
            elif arg != 'collapse':
                self.title = [arg]
        # Should it appear in the toc?
        self.intoc = int(kwds.pop('intoc', 0))
        self.kwds = kwds
        # Type of html élément depends on collapse flag
        if self.collapse:
            self.type = 'details'
        else:
            self.type = 'div'
            self.classes.append('.admonition')

            
    def get_id(self):
        return self.id

    def build_title(self):
        if self.intoc > 0:
            self.title.append(E(f'h{self.intoc}.hidden', self.title[0]))


    def get_title_type(self):
        if self.collapse:
            return 'summary'
        else:
            return 'p.admonition-title'
   
    def to_html(self):
        self.build_title()
        return E(self.type + ''.join(self.classes),
            dict(id=self.get_id()) if self.id else None,
            E(self.get_title_type(),
                self.title
            ),
            Markdown(self.ctx.content, self.ctx.parser),
            self.kwds
        )



class Enonce(Exercice):
    all = []

    @staticmethod
    def get_by_id(id):
        return next((enonce for enonce in Enonce.all if enonce.id == id), None)

    def __init__(self, ctx, args, kwds):
        # Défault title
        self.title = ['Exercice']
        # Does it have a correction to link to
        self.correction = 'correction' in args
        args = [arg for arg in args if arg != 'correction']
        
        super().__init__(ctx, args, kwds)
        self.classes.append('.question')
        Enonce.all.append(self)

    
    def get_id(self):
        return self.id
    
    def build_title(self):
        if self.correction:
            self.title.append(E("a.inline .end .w-auto", dict(href=f'#{self.id}-correction'),
                svg_icon("M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7Z")
            ))
        super().build_title()

    @staticmethod
    def get_html(ctx, args, kwds):
        enonce = Enonce(ctx, args, kwds)
        return enonce.to_html()

class Correction(Exercice):
    """
    Une correction doit apparaitre après l'énoncé
    """
    def __init__(self, ctx, args, kwds):
        self.title = ['correction']
        super().__init__(ctx, args, kwds)
        if self.id:
            self.enonce = Enonce.get_by_id(self.id)
        if self.id and self.enonce:
            self.title = [E('span', 'Correction de l\'',  E('a', dict(href=f'#{self.enonce.get_id()}'),self.enonce.title[0]))]
        elif not self.title:
            self.title = ['Correction']
        self.classes.append('.correction')
        


    def get_id(self):
        return self.id + '-correction'


    @staticmethod
    def get_html(ctx, args, kwds):
        correction = Correction(ctx, args, kwds)
        return correction.to_html()

def correction(ctx, *args, **kwds):
    return Correction.get_html(ctx, args, kwds)

def enonce(ctx, *args, **kwds):
    return Enonce.get_html(ctx, args, kwds)
