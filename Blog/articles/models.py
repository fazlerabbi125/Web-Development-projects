from django.db import models
from django.utils.text import slugify
from accounts.models import Author
import string
import random
# Create your models here.
def rand_slug():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(6))
    
class Article(models.Model):
    type=[('Personal','Personal'),
    ('Fashion','Fashion'),
    ('Food','Food'),
    ('Travel','Travel'),
    ('Music','Music'),
    (' Lifestyle',' Lifestyle'),
    ('Fitness','Fitness'),
    ('Sports','Sports'),
    ('News','News'),
    ('Entertainment','Entertainment'),
    ('Healthcare','Healthcare'),
    ('Education','Education'),
    ]
    title = models.CharField(max_length=255,unique=True)
    body = models.TextField()
    create_date = models.DateTimeField('Created on', auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True) 
    slug = models.SlugField()
    category = models.CharField(max_length=255,choices=type)
    author = models.ForeignKey(Author, default=None,on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.title} by {self.author.user}'
    def snippet(self):
        return self.body[:50] + '...'
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title+ "-" +rand_slug())
        super(Article, self).save(*args, **kwargs)
    class Meta:
        ordering=['-create_date','title']
